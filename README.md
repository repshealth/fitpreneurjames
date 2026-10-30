# FP Private 1-1 Consulting Page

Landing page for James's private 1-1 consulting for fitness coaches.

## What's here

- **index.html**: the full page (hero video, testimonials, WhatsApp proof, application form, FAQ)
- **assets/videos**: the seven testimonial videos, compressed for web
- **assets/posters**: thumbnail frames for each testimonial video
- **assets/proof**: the five WhatsApp screenshots
- **apps-script/Code.gs**: Google Apps Script that saves form submissions to the "FitPreneurio Form Submission" Google Sheet

## Running it

It's a static site with no build step. Open `index.html` in a browser, or deploy the folder to GitHub Pages, Netlify or Vercel.

The hero video streams from its existing CDN link, and the Montserrat font loads from Google Fonts.

## Form submissions

The form posts to the Apps Script web app URL set in `FORM_ENDPOINT` inside `index.html`. If you change `Code.gs`, redeploy it in Apps Script via Deploy > Manage deployments > New version. The URL stays the same.
