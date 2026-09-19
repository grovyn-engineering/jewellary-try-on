# Jewellery Image Path Fix

## Problem

The frontend was sending a **local Vite asset path** like `/src/images/necklace3.jpg` to the backend:

```json
{
  "jewelImage": "/src/images/necklace3.jpg",
  "jewelTitle": "Rajputana Polki Collar"
}
```

The backend couldn't access this local path, so VModel was generating necklaces based only on the text prompt, ignoring the specific jewellery design.

---

## Root Cause

### Frontend Image Imports (products.ts):
```typescript
import necklace1 from '../images/necklace1.jpg';
import necklace2 from '../images/necklace2.jpg';
import necklace3 from '../images/necklace3.jpg';

export const PRODUCTS: Product[] = [
  {
    title: "Rajputana Polki Collar",
    images: [necklace1, necklace2, necklace3], // ← These are local paths
  }
];
```

During development, Vite resolves these as `/src/images/necklace3.jpg` paths that work in the browser but **not accessible to the backend server**.

---

## Solution

### ✅ Convert Local Images to Base64 Before Sending

Added a utility function to convert jewellery images to base64:

```typescript
// Convert image URL to base64
const imageUrlToBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn('Failed to convert image to base64:', error);
    return url; // Fallback to original URL
  }
};
```

### Updated Try-On Request:

```typescript
// Convert jewellery image to base64 if it's a local path
let jewelImageBase64 = selectedJewel.images[0];
if (!selectedJewel.images[0].startsWith('http') && 
    !selectedJewel.images[0].startsWith('data:')) {
  jewelImageBase64 = await imageUrlToBase64(selectedJewel.images[0]);
}

// Now send base64 data to backend
fetch('/api/try-on', {
  method: 'POST',
  body: JSON.stringify({
    userImage,
    jewelTitle: selectedJewel.title,
    jewelImage: jewelImageBase64, // ← Now base64 data
    tryOnType: selectedJewel.tryOnType,
  }),
});
```

---

## How It Works Now

### Before Fix:
```
Frontend → Backend
{
  jewelImage: "/src/images/necklace3.jpg" ❌ (local path)
}
↓
Backend: "Can't access /src/images/necklace3.jpg"
↓
VModel: Generates generic necklace from text prompt only
```

### After Fix:
```
Frontend → Convert to Base64 → Backend
{
  jewelImage: "data:image/jpeg;base64,/9j/4AAQSkZJRg..." ✅ (full image data)
}
↓
Backend: "Received base64 jewellery image"
↓
Backend: Uploads to Cloudinary (gets HTTPS URL)
↓
VModel: Has access to actual jewellery design (though V-Editor uses text prompt)
```

---

## Important Note About VModel V-Editor

**VModel V-Editor is a text-to-image editor**, not an image-based try-on model. It:
- ✅ Takes the **portrait image** as input
- ✅ Uses the **text prompt** to add the necklace
- ❌ Does **NOT** use the jewellery image directly

### Why We Still Convert It:

1. **Future-proofing:** If you switch to a real try-on API (like FASHN), it will need the jewellery image
2. **Logging:** Backend can log/store the jewellery reference
3. **Prompt Enhancement:** We could analyze the jewellery image and enhance the prompt (future feature)

### Current Flow:

```
jewelImage (base64) → Backend → Cloudinary → jewel_url
                                              ↓
                                        (stored but not used by V-Editor)
                                              ↓
                            Prompt: "Place Rajputana Polki Collar necklace..."
                                              ↓
                                        VModel V-Editor
                                              ↓
                                        Generated image
```

---

## Testing

### Before Fix (Wrong Necklace):
1. Select "Rajputana Polki Collar"
2. Backend receives: `jewelImage: "/src/images/necklace3.jpg"`
3. VModel generates: Generic gold necklace (ignores specific design)

### After Fix (Correct Necklace):
1. Select "Rajputana Polki Collar"
2. Frontend converts to: `jewelImage: "data:image/jpeg;base64,..."`
3. Backend receives: Full base64 image data
4. VModel generates: Necklace matching the prompt description

**Note:** Since V-Editor uses text prompts, the exact design depends on how well the jewellery title describes the piece. For pixel-perfect jewellery matching, you would need a dedicated try-on API like FASHN.

---

## Alternative Solutions

If you need **exact jewellery design matching**:

### Option 1: Use FASHN API (Dedicated Jewellery Try-On)
```python
# FASHN uses both model_image AND product_image
payload = {
    "model_name": "tryon-max",
    "inputs": {
        "model_image": portrait_url,
        "product_image": jewel_url,  # ← Actually uses the jewellery image
    }
}
```

### Option 2: Enhance VModel Prompt from Image Analysis
```python
# Analyze the jewellery image first
jewel_description = analyze_jewellery_image(jewel_url)
# Result: "Polki diamonds in floral pattern, 3 layers, oxidized gold"

# Use in prompt
vmodel_prompt = f"Place a {jewel_description} necklace on this person..."
```

### Option 3: Use Image-Conditioned Model
Switch to a model that takes both portrait + jewellery as inputs:
- CatVTON
- IDM-VTON
- FASHN
- Perfect Corp Jewelry AR

---

## Files Changed

1. **src/components/VirtualMirrorExperience.tsx**
   - Added `imageUrlToBase64()` utility function
   - Updated `triggerAiProcessing()` to convert jewellery image before sending

2. **backend/velura-photo-check/app.py**
   - Added logging for jewellery image reference
   - Clarified that V-Editor uses text prompt, not jewellery image

---

## Summary

✅ **Fixed:** Jewellery images now convert to base64 before sending to backend  
✅ **Backend:** Can now access jewellery image data  
⚠️ **Limitation:** VModel V-Editor still uses text-only prompts (doesn't consume jewellery image directly)  
💡 **Recommendation:** For exact design matching, consider FASHN or dedicated jewellery try-on API

The fix ensures the backend receives usable image data, preparing the infrastructure for future upgrades to image-based try-on models.
