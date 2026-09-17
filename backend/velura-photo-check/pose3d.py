"""
pose3d.py -- wrapper around the 3DDFA_V2 pose model with graceful fallback if PyTorch is not installed.
"""
import os
import sys
import threading

_HERE = os.path.dirname(os.path.abspath(__file__))
_LITE_DIR = os.path.join(_HERE, "tddfa_lite")
if _LITE_DIR not in sys.path:
    sys.path.insert(0, _LITE_DIR)

HAS_3DDFA = False
try:
    import torch
    import yaml
    from TDDFA import TDDFA
    from utils.pose import calc_pose
    HAS_3DDFA = True
except (ImportError, ModuleNotFoundError, Exception):
    HAS_3DDFA = False

_CONFIG_PATH = os.path.join(_LITE_DIR, "configs", "mb1_120x120.yml")

_lock = threading.Lock()
_singleton = None


class PoseEstimator3DDFA:
    def __init__(self, config_path=_CONFIG_PATH):
        if not HAS_3DDFA:
            raise RuntimeError("PyTorch / 3DDFA dependencies not available in current environment.")
        cfg = yaml.load(open(config_path), Loader=yaml.SafeLoader)
        cfg["checkpoint_fp"] = os.path.join(_LITE_DIR, cfg["checkpoint_fp"])
        cfg["bfm_fp"] = os.path.join(_LITE_DIR, cfg["bfm_fp"])
        self._tddfa = TDDFA(gpu_mode=False, **cfg)

    def estimate(self, image_bgr, box):
        x0, y0, x1, y1 = box
        param_lst, _ = self._tddfa(image_bgr, [[x0, y0, x1, y1, 1.0]])
        _, pose = calc_pose(param_lst[0])
        yaw, pitch, roll = pose
        return float(yaw), float(pitch), float(roll)


def get_estimator():
    """Thread-safe lazy singleton -- returns None if torch/3DDFA is not installed."""
    global _singleton
    if not HAS_3DDFA:
        return None
    if _singleton is None:
        with _lock:
            if _singleton is None:
                try:
                    _singleton = PoseEstimator3DDFA()
                except Exception as e:
                    print(f"[pose3d] 3DDFA notice: {e} (falling back to 2D landmark pose)")
                    _singleton = None
    return _singleton
