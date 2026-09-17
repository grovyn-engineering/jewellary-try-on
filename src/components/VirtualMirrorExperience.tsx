import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';
import {
  Sparkles,
  Camera,
  Upload,
  RotateCcw,
  Sun,
  Sunset,
  Moon,
  Flame,
  ZoomIn,
  ZoomOut,
  Share2,
  Heart,
  Calendar,
  ChevronRight,
  Info,
  CheckCircle2,
  X,
  Layers,
  Compass,
  ArrowRight
} from 'lucide-react';

interface VirtualMirrorProps {
  initialProduct?: Product;
  onClose?: () => void;
  isStandalonePage?: boolean;
}

// Curated high-fashion portraits for demo mode
const DEMO_MODELS = [
  {
    id: 'model-1',
    name: 'Salon Patron I',
    tag: 'Classic Studio Daylight',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'model-2',
    name: 'Salon Patron II',
    tag: 'Bridal Profile',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'model-3',
    name: 'Salon Patron III',
    tag: 'Evening Gala',
    url: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1200&q=85'
  }
];

const PROCESSING_STEPS = [
  '01 ANALYSING IMAGE',
  '02 UNDERSTANDING COMPOSITION',
  '03 PLACING THE JEWEL',
  '04 BALANCING LIGHT',
  '05 FINISHING PREVIEW'
];

type LightingMode = 'daylight' | 'golden_hour' | 'evening' | 'candlelight';

export const VirtualMirrorExperience: React.FC<VirtualMirrorProps> = ({
  initialProduct,
  onClose,
  isStandalonePage = false
}) => {
  const { setAppointmentModalOpen, setPreselectedJewel, showToast, toggleWishlist, isInWishlist, navigate } = useShop();

  // Curated compatible jewels from catalog
  const tryOnJewels = PRODUCTS.filter(p => p.tryOnCompatible);
  const [selectedJewel, setSelectedJewel] = useState<Product>(() => {
    return initialProduct || tryOnJewels[0] || PRODUCTS[0];
  });

  // State Machine:
  // 'step-2-source' (Upload Portrait) -> 'step-3-confirm' (Review) -> 'step-4-processing' -> 'step-5-result'
  const [activeStep, setActiveStep] = useState<
    'step-1-piece' | 'step-2-source' | 'step-3-confirm' | 'step-4-processing' | 'step-5-result'
  >('step-2-source');

  const [userImage, setUserImage] = useState<string>('');
  const [processingStage, setProcessingStage] = useState(0);

  // Result controls
  const [sliderPosition, setSliderPosition] = useState(50);
  const [lightingMode, setLightingMode] = useState<LightingMode>('daylight');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // AI Style Match state
  const [styleMatchOpen, setStyleMatchOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<'MINIMAL' | 'ROYAL' | 'ROMANTIC' | 'STATEMENT' | 'CONTEMPORARY'>('ROYAL');

  // Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);

  // Clean up camera stream
  useEffect(() => {
    return () => {
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Sync initialProduct if passed
  useEffect(() => {
    if (initialProduct) {
      setSelectedJewel(initialProduct);
      setUserImage('');
      setActiveStep('step-2-source');
    }
  }, [initialProduct]);

  // Handle Camera initialization
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        cameraStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setIsCameraActive(true);
        setActiveStep('step-2-source');
      } else {
        setCameraError('Camera access is not supported by your browser environment.');
      }
    } catch (err: any) {
      console.warn('Camera error:', err);
      setCameraError('Camera permission not granted. Please select a salon model or upload a portrait.');
    }
  };

  const [validationInfo, setValidationInfo] = useState<{
    checking: boolean;
    passed?: boolean;
    message?: string;
    reasons?: string[];
  }>({ checking: false });
  const [aiFittingNotes, setAiFittingNotes] = useState<string | null>(null);
  const [aiRenderedImage, setAiRenderedImage] = useState<string | null>(null);

  // Run backend portrait validation check
  const runValidation = async (dataUrl: string) => {
    setValidationInfo({ checking: true });
    try {
      const res = await fetch('/api/photo-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userImage: dataUrl }),
      });
      const data = await res.json();
      if (res.ok && (data.ok || data.passed)) {
        setValidationInfo({
          checking: false,
          passed: true,
          message: data.message || 'Optimal framing and lighting calibrated for Haute Joaillerie fitting.',
        });
      } else {
        setValidationInfo({
          checking: false,
          passed: false,
          reasons: data.reasons || ['Please ensure neckline, face, and ears are clearly in frame.'],
        });
      }
    } catch {
      // Graceful local fallback
      setValidationInfo({
        checking: false,
        passed: true,
        message: 'Salon optical calibration active (studio fallback mode).',
      });
    }
  };

  const selectPortraitImage = (imgUrl: string) => {
    setUserImage(imgUrl);
    runValidation(imgUrl);
    setActiveStep('step-3-confirm');
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Mirror horizontal for intuitive selfie capture
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

      // Stop camera stream
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach(t => t.stop());
        cameraStreamRef.current = null;
      }
      setIsCameraActive(false);
      selectPortraitImage(dataUrl);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          selectPortraitImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  // Run the full AI generation flow (with server call & graceful fallback)
  const triggerAiProcessing = async () => {
    setActiveStep('step-4-processing');
    setProcessingStage(0);
    setAiFittingNotes(null);
    setAiRenderedImage(null);

    // Animate processing stages while the backend call runs in parallel.
    // Each stage advances every 2 s so the animation fills the real wait time
    // (VModel can take 20–60 s). The last stage loops until the fetch resolves.
    const stageInterval = setInterval(() => {
      setProcessingStage(prev =>
        prev >= PROCESSING_STEPS.length - 1 ? prev : prev + 1
      );
    }, 2000);

    // Minimum display time so the processing screen never flashes away instantly
    const minDisplay = new Promise<void>(resolve => setTimeout(resolve, 3000));

    // Await the backend response so aiRenderedImage is set BEFORE we transition
    try {
      const [res] = await Promise.all([
        fetch('/api/try-on', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userImage,
            jewelTitle: selectedJewel.title,
            jewelImage: selectedJewel.images[0],
            tryOnType: selectedJewel.tryOnType,
            lighting: lightingMode,
          }),
        }),
        minDisplay,
      ]);

      const data = await res.json();
      if (data) {
        if (data.notes) setAiFittingNotes(data.notes);
        if (data.outputImageUrl) setAiRenderedImage(data.outputImageUrl);
      }
    } catch (err) {
      console.warn('Haute Joaillerie backend try-on notice:', err);
      // Ensure minDisplay has elapsed even if fetch threw early
      await minDisplay;
    } finally {
      clearInterval(stageInterval);
      setProcessingStage(PROCESSING_STEPS.length - 1);
      setActiveStep('step-5-result');
      showToast('Visual fitting ready • High Jewellery Studio');
    }
  };

  // Drag / Touch comparison slider handlers
  const handleSliderMove = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      handleSliderMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleSliderMove(e.touches[0].clientX);
    }
  };

  // Lighting adjustments
  const lightingFilters = {
    daylight: 'brightness(1.02) contrast(1.01)',
    golden_hour: 'sepia(0.18) saturate(1.12) brightness(1.02) hue-rotate(-5deg)',
    evening: 'brightness(0.96) contrast(1.06) saturate(0.98)',
    candlelight: 'sepia(0.3) saturate(1.22) brightness(0.98) hue-rotate(-12deg)'
  };

  // AI Style Match Recommendations
  const styleMatchPieces: Record<string, { desc: string; ids: string[] }> = {
    MINIMAL: {
      desc: 'Quietly refined architecture highlighting single exceptional stones.',
      ids: ['aur-004', 'aur-005', 'aur-008']
    },
    ROYAL: {
      desc: 'Imperial court grandeur with untreated emeralds and basra pearls.',
      ids: ['aur-001', 'aur-002', 'aur-003']
    },
    ROMANTIC: {
      desc: 'Delicate floral articulation with rose-cut diamonds and pink tourmalines.',
      ids: ['aur-005', 'aur-002', 'aur-007']
    },
    STATEMENT: {
      desc: 'Uncompromising volume, sovereign presence, and monumental carat weights.',
      ids: ['aur-001', 'aur-003', 'aur-006']
    },
    CONTEMPORARY: {
      desc: 'Sleek modern geometry paired with ancient Kundan-Jadau setting.',
      ids: ['aur-006', 'aur-007', 'aur-004']
    }
  };

  return (
    <div className={`w-full bg-[#FCFAF6] text-[#272522] ${isStandalonePage ? 'min-h-screen pt-24 pb-20' : ''}`}>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Main Experience Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between py-6 border-b border-[#272522]/10 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.35em] uppercase font-sans text-[#A98B58] font-medium">
                AUREVYA VIRTUAL MIRROR
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A98B58]" />
              <span className="text-[8px] tracking-[0.2em] uppercase font-sans text-[#6D655B]">
                AI VISUALISATION PREVIEW
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#272522] mt-1">
              See It On You
            </h1>
          </div>

          {/* Top Actions: AI Style Match & Close */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStyleMatchOpen(!styleMatchOpen)}
              className="px-3 py-1.5 border border-[#A98B58]/40 hover:border-[#A98B58] bg-[#F7F3EC] text-[#272522] text-[9px] tracking-[0.18em] uppercase font-sans flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Compass size={12} className="text-[#A98B58]" />
              <span>AI STYLE MATCH</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-[#6D655B] hover:text-[#272522] hover:bg-[#F7F3EC] transition-colors"
                aria-label="Close Virtual Mirror"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* AI Style Match Drawer / Bar */}
        {styleMatchOpen && (
          <div className="mb-8 p-6 bg-[#F7F3EC] border border-[#272522]/10 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[8px] tracking-[0.25em] uppercase text-[#A98B58] font-sans font-medium block">
                  INTELLIGENT CURATION
                </span>
                <h3 className="font-serif text-xl text-[#272522]">Discover Your Jewellery Archetype</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['MINIMAL', 'ROYAL', 'ROMANTIC', 'STATEMENT', 'CONTEMPORARY'] as const).map(style => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`px-3 py-1 text-[9px] tracking-wider uppercase font-sans border transition-all ${
                      selectedStyle === style
                        ? 'border-[#A98B58] bg-[#272522] text-[#FCFAF6]'
                        : 'border-[#272522]/15 bg-[#FCFAF6] text-[#6D655B] hover:text-[#272522]'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <p className="font-serif italic text-sm text-[#6D655B] mb-4">
              "{styleMatchPieces[selectedStyle].desc}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {styleMatchPieces[selectedStyle].ids.map(id => {
                const jewel = PRODUCTS.find(p => p.id === id);
                if (!jewel) return null;
                return (
                  <div
                    key={id}
                    onClick={() => {
                      setSelectedJewel(jewel);
                      setStyleMatchOpen(false);
                      triggerAiProcessing();
                    }}
                    className="cursor-pointer border border-[#272522]/10 bg-[#FCFAF6] hover:border-[#A98B58] p-2 flex items-center gap-3 transition-all"
                  >
                    <img src={jewel.images[0]} alt={jewel.title} className="w-12 h-12 object-cover bg-[#EEE8DE]" />
                    <div className="overflow-hidden">
                      <p className="font-serif text-xs text-[#272522] truncate">{jewel.title}</p>
                      <p className="text-[10px] text-[#A98B58] font-sans">{jewel.formattedPrice}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* WORKFLOW VIEWPORTS */}

        {/* STEP 1: CHOOSE PIECE */}
        {activeStep === 'step-1-piece' && (
          <div className="py-8 animate-in fade-in duration-300">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#A98B58] font-sans font-medium block mb-2">
                STEP 01 OF 03
              </span>
              <h2 className="font-serif text-3xl text-[#272522] font-light">Select Your Necklace to Preview</h2>
              <p className="text-xs text-[#6D655B] mt-2 font-light">
                Choose a sovereign necklace from our High Atelier vault.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {tryOnJewels.map(jewel => (
                <div
                  key={jewel.id}
                  onClick={() => {
                    setSelectedJewel(jewel);
                    setActiveStep('step-2-source');
                  }}
                  className={`cursor-pointer border p-3 flex flex-col justify-between transition-all duration-300 ${
                    selectedJewel.id === jewel.id
                      ? 'border-[#A98B58] bg-[#F7F3EC] shadow-md'
                      : 'border-[#272522]/10 bg-[#FCFAF6] hover:border-[#A98B58]/50'
                  }`}
                >
                  <div className="aspect-square overflow-hidden bg-[#EEE8DE]/50 mb-2">
                    <img src={jewel.images[0]} alt={jewel.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xs text-[#272522] line-clamp-1">{jewel.title}</h4>
                    <p className="text-[10px] text-[#A98B58] font-sans mt-0.5">{jewel.formattedPrice}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setActiveStep('step-2-source')}
                className="px-8 py-3.5 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[10px] tracking-[0.22em] uppercase font-sans font-medium transition-all"
              >
                PROCEED WITH {selectedJewel.title}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SOURCE (CAMERA OR UPLOAD) */}
        {activeStep === 'step-2-source' && (
          <div className="py-8 animate-in fade-in duration-300 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#A98B58] font-sans font-medium block mb-2">
                STEP 01 • PORTRAIT ACQUISITION
              </span>
              <h2 className="font-serif text-3xl text-[#272522] font-light">Provide Your Portrait</h2>
              <p className="text-xs text-[#6D655B] mt-1.5 font-light">
                Upload your photo or take a live picture to preview {selectedJewel.title} fitted to you.
              </p>
              <div className="flex items-center justify-center gap-4 text-[11px] text-[#A98B58] mt-2 font-sans">
                <span>✦ Front-facing</span>
                <span>•</span>
                <span>✦ Clear lighting</span>
                <span>•</span>
                <span>✦ Neckline & ears visible</span>
              </div>
            </div>

            {/* Live Camera View if active */}
            {isCameraActive ? (
              <div className="relative aspect-[3/4] max-w-sm mx-auto overflow-hidden border border-[#A98B58] bg-[#F7F3EC] mb-6 shadow-xl">
                <video ref={videoRef} playsInline muted className="w-full h-full object-cover -scale-x-100" />
                {/* Visual alignment guides */}
                <div className="absolute inset-0 pointer-events-none border border-white/20 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 rounded-full border border-dashed border-[#A98B58]/40 opacity-70" />
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                  <button
                    onClick={capturePhoto}
                    className="px-6 py-2.5 bg-[#272522] text-[#FCFAF6] text-[10px] tracking-wider uppercase font-sans font-medium shadow-lg"
                  >
                    CAPTURE PHOTO
                  </button>
                  <button
                    onClick={() => {
                      if (cameraStreamRef.current) {
                        cameraStreamRef.current.getTracks().forEach(t => t.stop());
                        cameraStreamRef.current = null;
                      }
                      setIsCameraActive(false);
                    }}
                    className="px-4 py-2.5 bg-[#FCFAF6] text-[#272522] text-[10px] tracking-wider uppercase font-sans border border-[#272522]/20"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {cameraError && (
                  <div className="p-3 bg-[#F7F3EC] border border-[#A98B58]/40 text-xs text-[#6D655B] text-center">
                    {cameraError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Upload Portrait Option */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="cursor-pointer border border-[#272522]/15 hover:border-[#A98B58] bg-[#F7F3EC] p-8 text-center flex flex-col items-center justify-center transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full border border-[#A98B58]/40 flex items-center justify-center text-[#A98B58] mb-3 group-hover:scale-105 transition-transform bg-[#FCFAF6]">
                      <Upload size={20} />
                    </div>
                    <h3 className="font-serif text-lg text-[#272522]">Upload Portrait</h3>
                    <p className="text-[11px] text-[#6D655B] mt-1 font-light">From your desktop or camera roll</p>
                  </div>

                  {/* Live Camera Option */}
                  <div
                    onClick={startCamera}
                    className="cursor-pointer border border-[#272522]/15 hover:border-[#A98B58] bg-[#F7F3EC] p-8 text-center flex flex-col items-center justify-center transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full border border-[#A98B58]/40 flex items-center justify-center text-[#A98B58] mb-3 group-hover:scale-105 transition-transform bg-[#FCFAF6]">
                      <Camera size={20} />
                    </div>
                    <h3 className="font-serif text-lg text-[#272522]">Use Camera</h3>
                    <p className="text-[11px] text-[#6D655B] mt-1 font-light">Real-time salon sensor alignment</p>
                  </div>
                </div>

                {/* Or Select Salon Demo Model */}
                <div className="pt-6 border-t border-[#272522]/10">
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#6D655B] font-sans block text-center mb-4">
                    OR PREVIEW ON SALON PATRON MODELS
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {DEMO_MODELS.map(model => (
                      <div
                        key={model.id}
                        onClick={() => selectPortraitImage(model.url)}
                        className="cursor-pointer border border-[#272522]/10 hover:border-[#A98B58] p-2 bg-[#F7F3EC] text-center transition-all"
                      >
                        <img src={model.url} alt={model.name} className="w-full aspect-[4/5] object-cover mb-2" />
                        <span className="text-[10px] font-serif text-[#272522] block">{model.name}</span>
                        <span className="text-[8px] text-[#6D655B] block">{model.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: UPLOAD PREVIEW & CONFIRM */}
        {activeStep === 'step-3-confirm' && (
          <div className="py-8 animate-in fade-in duration-300 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#A98B58] font-sans font-medium block mb-2">
                STEP 03 OF 03 • CALIBRATION REVIEW
              </span>
              <h2 className="font-serif text-3xl text-[#272522] font-light">Confirm Your Virtual Fitting</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 border border-[#272522]/15 bg-[#F7F3EC] mb-6">
              <div>
                <span className="text-[8px] tracking-[0.2em] uppercase text-[#6D655B] font-sans block mb-2">
                  YOUR PORTRAIT
                </span>
                <div className="aspect-[3/4] overflow-hidden border border-[#272522]/10 bg-[#EEE8DE] relative">
                  <img src={userImage} alt="Portrait preview" className="w-full h-full object-cover" />
                  
                  {/* Validation Badge */}
                  <div className="absolute bottom-2 left-2 right-2 p-2 bg-[#FCFAF6]/95 border border-[#A98B58]/40 backdrop-blur-xs text-[9px] font-sans text-[#272522]">
                    {validationInfo.checking ? (
                      <span className="text-[#A98B58] flex items-center gap-1.5 animate-pulse">
                        ✦ Calibrating optical pose & neckline visibility...
                      </span>
                    ) : validationInfo.passed === false ? (
                      <div className="text-[#994D38]">
                        <span className="font-medium block">✦ Salon Alignment Advisory:</span>
                        <span className="text-[8px] text-[#6D655B]">
                          {validationInfo.reasons?.[0] || 'Please ensure neckline and face are visible.'}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#272522] flex items-center gap-1.5 font-medium">
                        <Sparkles size={11} className="text-[#A98B58]" />
                        <span>{validationInfo.message || 'Optimal neckline & lighting for haute joaillerie.'}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[8px] tracking-[0.2em] uppercase text-[#A98B58] font-sans font-medium block mb-2">
                    SELECTED HIGH JEWEL
                  </span>
                  <div className="aspect-square w-24 overflow-hidden border border-[#272522]/10 bg-[#EEE8DE] mb-3">
                    <img src={selectedJewel.images[0]} alt={selectedJewel.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-serif text-xl text-[#272522]">{selectedJewel.title}</h3>
                  <p className="text-xs text-[#A98B58] font-sans mt-0.5">{selectedJewel.formattedPrice}</p>
                  <p className="text-[11px] text-[#6D655B] font-light mt-2 leading-relaxed">
                    {selectedJewel.metal} • {selectedJewel.specs[0]?.weight || selectedJewel.primaryStone}
                  </p>
                </div>

                <div className="space-y-2 pt-4">
                  <button
                    onClick={triggerAiProcessing}
                    className="w-full py-3.5 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[10px] tracking-[0.22em] uppercase font-sans font-medium flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Sparkles size={13} className="text-[#C9B38A]" />
                    <span>GENERATE MY PREVIEW</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2.5 border border-[#A98B58]/50 hover:border-[#A98B58] bg-[#FCFAF6] text-[#272522] text-[9.5px] tracking-wider uppercase font-sans flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Upload size={12} className="text-[#A98B58]" />
                      <span>UPLOAD PHOTO</span>
                    </button>
                    <button
                      onClick={() => setActiveStep('step-1-piece')}
                      className="w-full py-2.5 border border-[#272522]/20 hover:border-[#272522] bg-[#FCFAF6] text-[#272522] text-[9.5px] tracking-wider uppercase font-sans"
                    >
                      CHANGE PIECE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: CINEMATIC LIGHT-THEMED PROCESSING STATE */}
        {activeStep === 'step-4-processing' && (
          <div className="py-20 animate-in fade-in duration-500 max-w-md mx-auto text-center">
            {/* Gemstone Shimmer Reticle */}
            <div className="relative w-28 h-28 mx-auto mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-[#A98B58]/30 animate-ping opacity-30" />
              <div className="absolute inset-2 rounded-full border border-[#A98B58]/60 animate-spin opacity-50" style={{ animationDuration: '8s' }} />
              <div className="w-16 h-16 rounded-full bg-[#F7F3EC] border border-[#A98B58] flex items-center justify-center shadow-md">
                <Sparkles size={24} className="text-[#A98B58] animate-pulse" />
              </div>
            </div>

            <span className="text-[9px] tracking-[0.35em] uppercase text-[#A98B58] font-sans font-medium block mb-2">
              PREPARING YOUR PREVIEW
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#272522] font-light mb-6">
              Neural Optical Calibration
            </h2>

            {/* Fine Progress Line */}
            <div className="w-full h-[2px] bg-[#272522]/10 overflow-hidden mb-6">
              <div
                className="h-full bg-[#A98B58] transition-all duration-500 ease-out"
                style={{ width: `${((processingStage + 1) / PROCESSING_STEPS.length) * 100}%` }}
              />
            </div>

            {/* Stage Callout */}
            <p className="text-xs font-sans tracking-[0.2em] uppercase text-[#272522] font-medium">
              {PROCESSING_STEPS[processingStage]}
            </p>
            <p className="text-[11px] text-[#6D655B] font-light mt-2">
              Calculating specular highlights, anatomical drape, and ambient refraction.
            </p>
          </div>
        )}

        {/* STEP 5: WOW MOMENT RESULT STUDIO */}
        {activeStep === 'step-5-result' && (
          <div className="py-4 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Comparison Canvas & Sliders */}
              <div className="lg:col-span-8 space-y-4">
                {/* Main Viewport Container */}
                <div
                  ref={sliderContainerRef}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  className="relative aspect-[3/4] sm:aspect-[4/5] w-full max-h-[70vh] mx-auto overflow-hidden border border-[#272522]/15 bg-[#EEE8DE] select-none cursor-ew-resize shadow-lg"
                  style={{ filter: lightingFilters[lightingMode] }}
                >
                  {/* Layer 1: BEFORE (Unadorned user portrait) */}
                  <img
                    src={userImage}
                    alt="Original portrait"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ transform: `scale(${zoomLevel})` }}
                  />

                  {/* Layer 2: AFTER (Integrated Jewel Overlay or AI Generated Render) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    {aiRenderedImage ? (
                      <img
                        src={aiRenderedImage}
                        alt="AI Virtual Fitting"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ transform: `scale(${zoomLevel})` }}
                      />
                    ) : (
                      <>
                        <img
                          src={userImage}
                          alt="Transformed portrait"
                          referrerPolicy="no-referrer"
                          className="absolute inset-0 w-full h-full object-cover"
                          style={{ transform: `scale(${zoomLevel})` }}
                        />

                        {/* Necklace Placement - Clavicle & Decolletage Draping */}
                        <div
                          className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
                          style={{ transform: `scale(${zoomLevel})` }}
                        >
                          <div className="absolute top-[50%] left-1/2 -translate-x-1/2 w-[60%] max-w-[270px] transition-all duration-300">
                            <img
                              src={selectedJewel.images[0]}
                              alt={selectedJewel.title}
                              referrerPolicy="no-referrer"
                              className="w-full object-contain filter drop-shadow-[0_16px_30px_rgba(20,18,15,0.5)]"
                              style={{ opacity: 0.97 }}
                            />
                          </div>

                          {/* Optical Diamond Sparkle / Refraction Highlight */}
                          <div className="absolute top-[52%] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/40 blur-[1px] animate-pulse pointer-events-none" />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Vertical Dividing Line & Precision Gold Handle */}
                  <div
                    className="absolute top-0 bottom-0 z-20 pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-[1.5px] h-full bg-[#A98B58] shadow-[0_0_10px_rgba(169,139,88,0.5)]" />
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FCFAF6] border border-[#A98B58] flex items-center justify-center shadow-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#A98B58]" />
                    </div>
                  </div>

                  {/* Corner Labels: BEFORE / AFTER */}
                  <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-[#FCFAF6]/90 border border-[#272522]/10 text-[8px] tracking-[0.25em] uppercase font-sans text-[#272522] backdrop-blur-xs">
                    AFTER
                  </div>
                  <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-[#FCFAF6]/90 border border-[#272522]/10 text-[8px] tracking-[0.25em] uppercase font-sans text-[#6D655B] backdrop-blur-xs">
                    BEFORE
                  </div>

                  {/* Zoom Controls Overlay */}
                  <div className="absolute bottom-4 right-4 z-10 flex gap-1 bg-[#FCFAF6]/90 border border-[#272522]/10 p-1 backdrop-blur-xs">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomLevel(prev => Math.min(1.4, prev + 0.1));
                      }}
                      className="p-1.5 text-[#6D655B] hover:text-[#272522]"
                      title="Zoom In"
                    >
                      <ZoomIn size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomLevel(prev => Math.max(0.9, prev - 0.1));
                      }}
                      className="p-1.5 text-[#6D655B] hover:text-[#272522]"
                      title="Zoom Out"
                    >
                      <ZoomOut size={14} />
                    </button>
                  </div>
                </div>

                {/* Relighting Simulator Controls (Section 18) */}
                <div className="p-4 bg-[#F7F3EC] border border-[#272522]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="text-[8px] tracking-[0.22em] uppercase text-[#6D655B] font-sans font-medium">
                    VIEW IN DIFFERENT LIGHT
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'daylight', label: 'Daylight', icon: Sun },
                      { id: 'golden_hour', label: 'Golden Hour', icon: Sunset },
                      { id: 'evening', label: 'Evening', icon: Moon },
                      { id: 'candlelight', label: 'Candlelight', icon: Flame }
                    ].map(light => {
                      const Icon = light.icon;
                      const isActive = lightingMode === light.id;
                      return (
                        <button
                          key={light.id}
                          onClick={() => setLightingMode(light.id as any)}
                          className={`px-3 py-1.5 text-[9px] tracking-wider uppercase font-sans flex items-center gap-1.5 border transition-all ${
                            isActive
                              ? 'border-[#A98B58] bg-[#272522] text-[#FCFAF6]'
                              : 'border-[#272522]/10 bg-[#FCFAF6] text-[#6D655B] hover:text-[#272522]'
                          }`}
                        >
                          <Icon size={12} className={isActive ? 'text-[#C9B38A]' : 'text-[#A98B58]'} />
                          <span>{light.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Honest AI UX Disclaimer (Section 45) */}
                <p className="text-[10px] text-[#6D655B] font-light leading-relaxed border-l-2 border-[#A98B58]/40 pl-3">
                  <strong className="font-medium text-[#272522]">AI VISUALISATION PREVIEW:</strong> Illustrative preview. Final physical fit, gem draping, and scale will be personally fitted by a Master Craftsman in our private salons.
                </p>
              </div>

              {/* Right Column: Piece Dossier & Primary Next Actions */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 bg-[#F7F3EC] border border-[#272522]/10 shadow-xs">
                  <span className="text-[8px] tracking-[0.25em] uppercase text-[#A98B58] font-sans font-medium block mb-1">
                    CURRENT SELECTION
                  </span>
                  <h3 className="font-serif text-2xl text-[#272522] font-light leading-tight">
                    {selectedJewel.title}
                  </h3>
                  <p className="font-serif italic text-xs text-[#6D655B] mt-0.5">
                    {selectedJewel.subtitle}
                  </p>
                  <p className="text-lg font-sans text-[#272522] font-medium mt-3">
                    {selectedJewel.formattedPrice}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#272522]/10 text-xs text-[#6D655B] space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[9px] uppercase tracking-wider text-[#6D655B]">Composition</span>
                      <span className="text-[#272522]">{selectedJewel.metal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[9px] uppercase tracking-wider text-[#6D655B]">Primary Stone</span>
                      <span className="text-[#272522]">{selectedJewel.primaryStone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[9px] uppercase tracking-wider text-[#6D655B]">Atelier Hours</span>
                      <span className="text-[#A98B58] font-medium">{selectedJewel.craftsmanshipHours}h handcraft</span>
                    </div>
                  </div>

                  {/* AI Fitting Report from Backend if available */}
                  {aiFittingNotes && (
                    <div className="mt-4 p-3 bg-[#FCFAF6] border border-[#A98B58]/30 text-xs">
                      <div className="flex items-center gap-1.5 text-[#A98B58] font-sans font-medium text-[9px] tracking-wider uppercase mb-1">
                        <Sparkles size={11} />
                        <span>ATELIER AI OPTICAL FIT REPORT</span>
                      </div>
                      <p className="text-[10px] text-[#6D655B] font-light leading-relaxed line-clamp-4">
                        {aiFittingNotes}
                      </p>
                    </div>
                  )}

                  {/* Primary Next Actions */}
                  <div className="space-y-2.5 mt-6 pt-4 border-t border-[#272522]/10">
                    <button
                      onClick={() => {
                        setPreselectedJewel(selectedJewel.title);
                        setAppointmentModalOpen(true);
                      }}
                      className="w-full py-3.5 bg-[#272522] hover:bg-[#3D3A35] text-[#FCFAF6] text-[10px] tracking-[0.22em] uppercase font-sans font-medium flex items-center justify-center gap-2 transition-all shadow-xs"
                    >
                      <Calendar size={13} className="text-[#C9B38A]" />
                      <span>BOOK PRIVATE VIEWING</span>
                    </button>

                    <button
                      onClick={() => toggleWishlist(selectedJewel.id)}
                      className="w-full py-3 border border-[#272522]/20 hover:border-[#A98B58] bg-[#FCFAF6] text-[#272522] text-[10px] tracking-[0.2em] uppercase font-sans font-medium flex items-center justify-center gap-2 transition-all"
                    >
                      <Heart size={13} className={isInWishlist(selectedJewel.id) ? 'fill-[#A98B58] text-[#A98B58]' : ''} />
                      <span>{isInWishlist(selectedJewel.id) ? 'SAVED TO PRIVATE EDIT' : 'SAVE TO PRIVATE EDIT'}</span>
                    </button>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2.5 border border-[#A98B58]/40 hover:border-[#A98B58] bg-[#FCFAF6] text-[#272522] hover:text-[#A98B58] text-[9px] tracking-wider uppercase font-sans flex items-center justify-center gap-2 transition-colors"
                    >
                      <Upload size={12} className="text-[#A98B58]" />
                      <span>TRY WITH YOUR OWN PHOTO</span>
                    </button>
                  </div>
                </div>

                {/* Try Another Piece Bar */}
                <div className="p-4 bg-[#F7F3EC] border border-[#272522]/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[8px] tracking-[0.2em] uppercase text-[#6D655B] font-sans font-medium">
                      TRY ANOTHER NECKLACE
                    </span>
                    <button
                      onClick={() => setActiveStep('step-2-source')}
                      className="text-[8px] tracking-wider uppercase text-[#A98B58] font-sans hover:underline"
                    >
                      CHANGE PHOTO
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {tryOnJewels.map(jewel => (
                      <div
                        key={jewel.id}
                        onClick={() => {
                          setSelectedJewel(jewel);
                          triggerAiProcessing();
                        }}
                        className={`cursor-pointer border p-1.5 transition-all ${
                          selectedJewel.id === jewel.id
                            ? 'border-[#A98B58] bg-[#FCFAF6]'
                            : 'border-[#272522]/10 bg-[#FCFAF6] hover:border-[#A98B58]/50'
                        }`}
                        title={jewel.title}
                      >
                        <img src={jewel.images[0]} alt={jewel.title} className="w-full aspect-square object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
