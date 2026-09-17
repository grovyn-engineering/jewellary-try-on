# Necklace-Only Virtual Try-On Update

## Changes Made

### ✅ Frontend Simplified (VirtualMirrorExperience.tsx)

**Removed:**
- All earrings, bracelets, rings, and choker rendering code
- Conditional `tryOnType` switches for different jewellery placement

**Kept:**
- Single necklace placement at top 50%, width 60%, centered
- Clean drop shadow styling
- Optical sparkle highlight effect

**Updated Text:**
- "Select Your Necklace to Preview" (was "Select Your Piece")
- "Choose a sovereign necklace from our High Atelier vault" (removed "choker, or ear suite")
- "Try Another Necklace" (was "Try Another Piece")

---

### ✅ Backend Prompt Enhanced (app.py)

**New Photorealistic VModel V-Editor Prompt:**
```
Place a luxury {jewel_title} necklace on this person's neck and chest area.
Position the necklace naturally following the clavicle and neckline contours.
The necklace should drape realistically with natural weight distribution.
Render photorealistic diamond sparkle, gold metal reflections, and gemstone brilliance.
Lighting: {lighting}.

CRITICAL REQUIREMENTS:
1. Keep the person's exact pose, position, and body angle completely unchanged.
2. Preserve the background 100% exactly as original - same colors, lighting, and details.
3. Keep the person's face, skin tone, hair, and clothing absolutely identical to the original.
4. The output must look like a real professional photograph, not AI-generated.
5. ONLY add the necklace - everything else must remain pixel-perfect identical.

The final image should look like the person was photographed while naturally wearing this necklace.
```

**Key Additions:**
- ✅ Explicit instruction: "exact pose, position, and body angle completely unchanged"
- ✅ Background preservation: "100% exactly as original - same colors, lighting, and details"
- ✅ Photorealism mandate: "must look like a real professional photograph, not AI-generated"
- ✅ Pixel-perfect requirement: "everything else must remain pixel-perfect identical"
- ✅ Natural result goal: "should look like the person was photographed while naturally wearing this necklace"

---

## Prompt Improvements Explained

### 1. Specific Placement Instructions
**Added:** "on this person's neck and chest area" + "following the clavicle and neckline contours"
- V-Editor needs explicit body part mentions
- "Clavicle" and "neckline" guide proper necklace positioning

### 2. Physics & Weight
**Added:** "drape realistically with natural weight distribution"
- Helps V-Editor understand the necklace has gravity and volume
- Prevents flat, sticker-like placement

### 3. Material Details
**Enhanced:** "photorealistic diamond sparkle, gold metal reflections, and gemstone brilliance"
- More specific than "realistic diamond refraction, gold lustre"
- "Photorealistic" signals high-quality rendering
- "Metal reflections" helps with gold/platinum rendering

### 4. Preservation Guard
**Strengthened:** "IMPORTANT: Preserve the person's face, skin tone, hair, and clothing completely unchanged. Only add the necklace - do not modify anything else"
- **IMPORTANT** tag signals priority instruction
- Lists specific elements to preserve (face, skin, hair, clothing)
- Explicit constraint: "Only add the necklace"

---

## Expected Results

### With Improved Prompt:
- ✅ Better necklace placement following natural neckline curves
- ✅ More realistic draping with visible weight
- ✅ Enhanced diamond sparkle and gold reflections
- ✅ Stronger preservation of original portrait features
- ✅ Less chance of AI modifying face/clothing

### Fallback Overlay (when VModel fails):
- ✅ Clean CSS-positioned necklace image
- ✅ Centered at chest area with drop shadow
- ✅ No more earrings/bracelets code confusion

---

## Testing Tips

1. **Upload various portrait angles:**
   - Front-facing (best results)
   - Slight 3/4 turn (should still work)
   - Different necklines (v-neck, round neck, off-shoulder)

2. **Watch backend logs for VModel:**
   ```
   [VModel] Creating V-Editor task...
   [VModel] Task created: xyz123
   [VModel] Poll 1/40: processing
   [VModel] Poll 8/40: succeeded
   [VModel] ✓ Success! Output: https://vmodel.ai/...
   ```

3. **Compare results:**
   - AI-generated (when VModel succeeds): Natural, integrated necklace
   - Fallback overlay (when VModel fails/timeout): Clean CSS mockup

---

## VModel V-Editor Quality Factors

**What Helps:**
- High-quality portrait (good lighting, sharp focus)
- Clear neckline visibility
- Descriptive jewel titles (e.g., "Diamond Rivière Necklace" vs "The Noor")
- Front-facing poses

**What May Hurt:**
- Low resolution portraits (<800px width)
- Busy backgrounds
- Extreme angles or tilted heads
- Multiple necklaces already in the photo

---

## Prompt Engineering Notes

V-Editor is a **general image editor**, not a dedicated jewellery try-on model. The prompt needs to be:
1. **Specific** — Exact body parts, materials, and physics
2. **Constrained** — Explicit "only add X, don't change Y"
3. **Visual** — Describe appearance, not abstract concepts

**Good prompts:**
- "Place a gold diamond necklace on the neck, draping naturally over the collarbone"
- "Add an emerald pendant necklace at chest level with realistic chain weight"

**Bad prompts:**
- "Add jewelry" (too vague)
- "Make them wear the necklace" (implies changing the person)
- "Beautiful necklace fitting" (subjective, unclear)

---

## Next Steps (Optional Improvements)

If VModel results are inconsistent:

1. **Add necklace type hints:**
   ```python
   if "choker" in jewel_title.lower():
       position = "high on the neck just below the jawline"
   elif "pendant" in jewel_title.lower():
       position = "centered at chest level with visible pendant drop"
   else:
       position = "following the clavicle and upper chest contours"
   
   vmodel_prompt = f"Place a luxury {jewel_title} necklace {position}. ..."
   ```

2. **Add image preprocessing:**
   - Detect neckline position using pose estimation
   - Pass neckline coordinates as guidance in the prompt

3. **Consider hybrid approach:**
   - Use VModel for the base composition
   - Apply post-processing overlay for extra sparkle/highlights

4. **Fallback to specialized API:**
   - If budget allows, integrate a dedicated jewelry try-on API like FASHN or Perfect Corp
   - VModel V-Editor works but isn't purpose-built for jewelry

---

## Cost & Performance

### VModel V-Editor:
- **Cost:** ~$0.01 per image (1024×1024 @ resolution=2)
- **Speed:** 8-15 seconds typical
- **Quality:** Good for prompt-based edits, may vary for complex jewelry

### Current Setup:
- Polls for up to 2 minutes (40 polls × 3s)
- Falls back to CSS overlay if VModel times out or fails
- Graceful degradation ensures users always see something

---

## Files Changed

1. `backend/velura-photo-check/app.py` — Enhanced necklace prompt
2. `src/components/VirtualMirrorExperience.tsx` — Removed non-necklace jewellery types
3. `backend/.env` — VModel key already configured
4. Documentation — This file

**Status:** ✅ Ready to test
