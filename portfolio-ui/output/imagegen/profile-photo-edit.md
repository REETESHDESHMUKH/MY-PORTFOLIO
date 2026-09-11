# Profile photo edit

- Method: built-in image generation/editing tool; no API/CLI fallback.
- Target: original blue-shirt mountain portrait (`public/images/reetesh-deshmukh.jpeg`).
- Supporting reference: owner-supplied `candid3.jpeg`, used for hairstyle/hairline only.
- Output: `public/images/reetesh-deshmukh-enhanced.png` (1086 × 1448).
- Both original photos are unchanged. This is an AI-edited photograph, not a lossless restoration.

## Final prompt

Use case: identity-preserve. Edit image 1, the original standing portrait of the man in the BLUE checked shirt and straw hat at a misty mountain viewpoint. Image 2, the same man seated in a YELLOW shirt beside water, is ONLY a reference for his real hairstyle and hairline. Remove the straw hat from image 1 and replace the covered region with his natural short, tousled dark hair, matching image 2, adapted to image 1's head angle and lighting. Also improve resolution and clarity naturally, particularly facial detail, glasses and hair. Preserve image 1's facial identity and facial geometry, expression, glasses, skin tone, facial hair, pose, blue shirt, white T-shirt, body, arms, original background and full 3:4 framing. Do not import the yellow shirt, backpack, seated pose or water background. Do not remove his hair. Photorealistic, natural skin texture, no face reshaping, beauty filtering or plastic smoothing. No hat, headwear, extra objects, text or watermark. Return one high-resolution edited version of image 1.
