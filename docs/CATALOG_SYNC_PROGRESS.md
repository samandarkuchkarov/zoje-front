# Catalog Sync Progress — PDF "PRICE 2026.pdf"

## STATUS: ✅ COMPLETED (2026-05-07)

All 43 PDF products created/updated in the API with correct QQS prices and sorted in PDF order (positions 1-43). ZJ103 was skipped (no valid QQS price in PDF). Existing non-PDF products pushed to positions 44+.

---

## Goal
Sync the backend API catalog to match the PDF price list (44 models, QQS prices).
All API calls use: `https://zojeshop.uz/backend-api/api/admin/products`
Auth: Bearer token (JWT, ask user for new one if expired)
Upload endpoint: `POST /api/admin/uploads/images` with field name `images` (multipart)
Update endpoint: `PUT /api/admin/products/{slug}` with full product body
Reorder: `PUT /api/admin/product-order` with `{ items: [{ slug, sortOrder }] }`

---

## PDF Product List (44 items, ordered by PDF № column)

| # | Model | QQS Price | API Slug | Status |
|---|-------|-----------|----------|--------|
| 1 | A6000-5G | 4,505,000 | zoje-a6000p-5g | ✅ EXISTS, correct price |
| 2 | A6000-P | 4,089,000 | a6000p | ✅ EXISTS, correct price |
| 3 | ZJ9903AR-D3B | 9,843,000 | zoje-zj9903ar-d3b | ✅ EXISTS, correct price |
| 4 | A8100-D4-W | 5,753,000 | zoje-a8100-d4-w | ✅ EXISTS, correct price |
| 5 | A7100-D4 | 6,377,000 | a7100 | ✅ UPDATED price+model |
| 6 | A7200-D4 | 5,892,000 | zoje-a7200-d4 | ⬜ NEED TO CREATE |
| 7 | A9200L | 8,734,000 | a9200l | ✅ UPDATED price |
| 8 | ZJ3830-S-BD | 6,793,000 | zoje-zj3830-s-bd | ⬜ NEED TO CREATE |
| 9 | ZJ3830-P-BD | 6,793,000 | zoje-zj3830-p-bd | ⬜ NEED TO CREATE |
| 10 | A5300-B | 6,931,000 | zoje-a5300-b | ⬜ NEED TO CREATE |
| 11 | ZJ20U93 | 5,684,000 | zoje-zj20u93 | ⬜ NEED TO CREATE |
| 12 | ZJ8450A | 10,536,000 | zj8450 | ✅ UPDATED price+model |
| 13 | B9000-13 | 5,476,000 | zoje-b9000-13 | ⬜ NEED TO CREATE |
| 14 | B9000-13-ED2 | 7,694,000 | zoje-b9000-13-ed2 | ⬜ NEED TO CREATE |
| 15 | B9500T-13H | 8,595,000 | zoje-b9500t-13h | ⬜ NEED TO CREATE |
| 16 | B9500-38 | 6,515,000 | zoje-b9500-38 | ⬜ NEED TO CREATE |
| 17 | B9500T-13H-ED2 | 11,368,000 | zoje-b9500t-13h-ed2 | ⬜ NEED TO CREATE |
| 18 | ZJ0303L-3-CX-BD | 6,238,000 | zj0303l | ✅ UPDATED price+model |
| 19 | ZJ0303L-3-CX-D4 | 8,387,000 | zoje-zj0303l-3-cx-d4 | ⬜ NEED TO CREATE |
| 20 | C5000-356 | 7,486,000 | c5000 | ✅ UPDATED price+model |
| 21 | C5000-G-356 | 7,625,000 | zoje-c5000-g-356 | ⬜ NEED TO CREATE |
| 22 | ZJC2521-156M-BDPD3C | 21,488,000 | zjc2500 | ✅ UPDATED price+model |
| 23 | ZJ1377-BD | 9,357,000 | zoje-zj1377-bd | ⬜ NEED TO CREATE |
| 24 | ZJ1903D-301-3-04-V4 | 22,181,000 | zj1903d | ✅ UPDATED price+model |
| 25 | ZJ781-BD | 17,329,000 | zoje-zj781-bd | ⬜ NEED TO CREATE |
| 26 | ZJ782-BD | 18,715,000 | zoje-zj782-bd | ⬜ NEED TO CREATE |
| 27 | ZJ5822 | 66,545,000 | zj5822a | ✅ UPDATED price+model |
| 28 | ZJ1900DSS-0604-3 | 23,568,000 | zj1900dss | ✅ UPDATED price+model |
| 29 | ZJ1900DSS-3-04-V4 | 18,715,000 | zoje-zj1900dss-3-04-v4 | ⬜ NEED TO CREATE |
| 30 | ZJ103 550KW | #ЗНАЧ! | — | ⏭ SKIP (no valid price) |
| 31 | ZJ927PL | 8,872,000 | zoje-zj927pl | ⬜ NEED TO CREATE |
| 32 | ZJ928PL | 9,565,000 | zoje-zj928pl | ⬜ NEED TO CREATE |
| 33 | ZJ-M3 | 79,022,000 | zj-m3 | ✅ UPDATED price |
| 34 | ZJ-M6-GS900H-SF-LK2 | 117,840,000 | zj-m6 | ✅ UPDATED price+model |
| 35 | ZJ-M7 | 145,568,000 | zj-m7 | ✅ UPDATED price |
| 36 | ZJ1508PR-BD | 13,170,000 | zoje-zj1508pr-bd | ⬜ NEED TO CREATE |
| 37 | ZJ9610-BD-H-3 | 9,704,000 | zoje-zj9610-bd-h-3 | ⬜ NEED TO CREATE |
| 38 | ZJ9630D-H-3-03 | 12,200,000 | zoje-zj9630d-h-3-03 | ⬜ NEED TO CREATE |
| 39 | ZJ2628-LG | 9,288,636 | zoje-zj2628-lg | ⬜ NEED TO CREATE |
| 40 | ZJ600 | 7,417,045 | zoje-zj600 | ⬜ NEED TO CREATE |
| 41 | ZJ500 | 2,842,000 | zoje-zj500 | ⬜ NEED TO CREATE |
| 42 | ZJ1414-...-12064 | 17,329,000 | zoje-zj1414-waistband | ⬜ NEED TO CREATE |
| 43 | Dazmol | 693,000 | zoje-dazmol | ⬜ NEED TO CREATE |
| 44 | ZJ100 | 1,039,000 | zoje-zj100 | ⬜ NEED TO CREATE |

---

## Uploaded Images

### From zoje-europe.com

| Product | Image URL |
|---------|-----------|
| ZJ20U93 img1 | https://zojeshop.uz/assets/uploads/products/1778161491436-zj20u93-1.jpg |
| ZJ20U93 img2 | https://zojeshop.uz/assets/uploads/products/1778161492476-zj20u93-2.jpg |
| ZJ20U93 img3 | https://zojeshop.uz/assets/uploads/products/1778161494411-zj20u93-3.jpg |
| A5300-B img1 | https://zojeshop.uz/assets/uploads/products/1778161495203-a5300-1.jpg |
| A5300-B img2 | https://zojeshop.uz/assets/uploads/products/1778161496452-a5300-2.jpg |
| B9500 family img1 | https://zojeshop.uz/assets/uploads/products/1778161498131-b9500-1.jpg |
| B9500 family img2 | https://zojeshop.uz/assets/uploads/products/1778161502044-b9500-2.jpg |
| ZJ0303L-3-CX-D4 img1 | https://zojeshop.uz/assets/uploads/products/1778161502956-zj0303l-d4-1.jpg |
| C5000-G-356 img1 | https://zojeshop.uz/assets/uploads/products/1778161504348-c5000g-1.jpg |
| C5000-G-356 img2 | https://zojeshop.uz/assets/uploads/products/1778161505918-c5000g-2.jpg |
| ZJ781-BD img1 | https://zojeshop.uz/assets/uploads/products/1778161506854-zj781-1.jpg |
| ZJ781-BD img2 | https://zojeshop.uz/assets/uploads/products/1778161507907-zj781-2.jpg |

### From existing catalog (reuse)

| Product | Image URL |
|---------|-----------|
| A7100 (use for A7200-D4) | https://zojeshop.uz/assets/products/a7100/gallery-1.jpg |
| A9200L (use for A9200L) | https://zojeshop.uz/assets/products/a9200l/gallery-1.jpg |
| ZJ1900DSS (use for ZJ1900DSS-3-04-V4) | https://zojeshop.uz/assets/products/zj-1900dss/gallery-1.jpg |
| ZJ1903D (use for ZJ1377-BD) | https://zojeshop.uz/assets/products/zj-1903d/gallery-1.jpg |
| ZJ8450 (use for ZJ927PL, ZJ928PL) | https://zojeshop.uz/assets/products/zj-8450/gallery-1.jpg |

---

## Products Still Needing Images

Specialty/shoe/blindstitch machines not found on zoje-europe.com:
- ZJ9610-BD-H-3, ZJ9630D-H-3-03 (shoe machines)
- ZJ2628-LG (bag sewing)
- ZJ600, ZJ500 (blindstitch)
- ZJ1414 (12-needle waistband)
- ZJ1508PR-BD (4-needle waistband)
- ZJ3830-S-BD, ZJ3830-P-BD (chain stitch)
- A7200-D4 (lockstitch, no dedicated image)
- ZJ1377-BD (button sewing)
- ZJ782-BD (buttonhole, can reuse ZJ781 image)
- Dazmol (iron)
- ZJ100 (rotary cutter)

**Fallback plan**: use a7100/zj8450/b9500 existing images for unknown ones.

---

## Reorder Plan (after all products created)

The final product-order endpoint call needs all 44+ slugs in PDF order.
PDF slugs in order:
1. zoje-a6000p-5g
2. a6000p
3. zoje-zj9903ar-d3b
4. zoje-a8100-d4-w
5. a7100
6. zoje-a7200-d4
7. a9200l
8. zoje-zj3830-s-bd
9. zoje-zj3830-p-bd
10. zoje-a5300-b
11. zoje-zj20u93
12. zj8450
13. zoje-b9000-13
14. zoje-b9000-13-ed2
15. zoje-b9500t-13h
16. zoje-b9500-38
17. zoje-b9500t-13h-ed2
18. zj0303l
19. zoje-zj0303l-3-cx-d4
20. c5000
21. zoje-c5000-g-356
22. zjc2500
23. zoje-zj1377-bd
24. zj1903d
25. zoje-zj781-bd
26. zoje-zj782-bd
27. zj5822a
28. zj1900dss
29. zoje-zj1900dss-3-04-v4
30. [SKIPPED - ZJ103 has no valid price]
31. zoje-zj927pl
32. zoje-zj928pl
33. zj-m3
34. zj-m6
35. zj-m7
36. zoje-zj1508pr-bd
37. zoje-zj9610-bd-h-3
38. zoje-zj9630d-h-3-03
39. zoje-zj2628-lg
40. zoje-zj600
41. zoje-zj500
42. zoje-zj1414-waistband
43. zoje-dazmol
44. zoje-zj100
