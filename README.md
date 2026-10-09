# TalentCore Global

## Laptop Scholarship 2026 (Phase 1)

Scholarship test for students of Class 4 to 12 in District Dadu, Jamshoro and Hyderabad.
The top 5 students of each district (15 laptops in total) receive a laptop at the Mega Award Ceremony.

| Folder | Contents |
|---|---|
| `site/` | Scholarship website (published to the `gh-pages` branch) |
| `documents/` | Guide & syllabus (Word) and the Excel management system |
| `marketing/` | Posters, 30-second promo video, advertisement & launch kit |

Website: https://altafhussainbirhmani376-rgb.github.io/TalentCore-Global/

A private scholarship program by TalentCore Global. Not a Government of Sindh scheme.

## Certificates (Future Talent Academy — affiliated with TalentCore Global)

- Verification page: `site/verify.html` (records in `site/data/certificates.json`)
- Make certificates for a month's top 3 from the marksheet:
  `python3 tools/make_certificates.py English_Computer_Monthly_Marksheet_2026-27.xlsx "Eng Oct 2026"`
  This adds the winners to `site/data/certificates.json` and writes a Word file with one certificate per winner,
  each with its own Certificate No. and QR code. Then publish `site/` to `gh-pages`.
- Blank template with QR: `documents/Award_Certificates_Template_with_QR.docx`
