# Tutorial Management Website — Vue 3

A responsive, client-only tutorial management website designed for free hosting on **GitHub Pages**.

## Features

- Vue 3 (loaded from CDN)
- No backend, database or server required
- Institution logo in the header
- Large institution banner / hero section
- Auto-changing gallery with fade transitions
- Responsive image and video gallery
- Gallery preserves the complete original image/video frame (no forced cropping)
- Direct MP4 video controls with automatic slideshow pause while playing
- Courses offered section
- Responsive study-material browser:
  - 6th Standard → 7th → 8th → 9th → 10th → 1st PUC → 2nd PUC
  - Click class
  - Click subject
  - Click a material
  - Google Drive opens in a new tab
- Mobile responsive design
- Works with GitHub Pages
- Easy content editing from one file: `app.js`

## Folder structure

```text
tutorial-management-vue/
├── index.html
├── app.js
├── README.md
└── assets/
    ├── logo.png
    ├── banner.png
    ├── image1.jpeg
    ├── image2.jpeg
    ├── image3.jpeg
    ├── image4.jpeg
    ├── image5.jpeg
    └── video1.mp4
```

## 1. Edit institution details

Open `app.js` and edit:

```js
const site = {
  name: "Your Institution Name",
  tagline: "Your tagline",
  contact: "+91 XXXXX XXXXX",
  logo: "assets/logo.svg",
  banner: "assets/banner.svg",
  heroEyebrow: "Your message",
  heroTitle: "Your main headline",
  heroText: "Your introduction..."
};
```

## 2. Add your real gallery images

The easiest option is to place your own files inside `assets/` and reference them:

```js
{
  id: 5,
  type: "image",
  src: "assets/my-classroom.jpg",
  title: "Our Classroom",
  description: "Students during a learning session."
}
```

For a YouTube video, use an embed URL:

```js
{
  id: 6,
  type: "video",
  src: "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  title: "Annual Day",
  description: "Highlights from our annual event."
}
```

For a direct MP4:

```js
{
  id: 7,
  type: "video",
  src: "assets/annual-day.mp4",
  title: "Annual Day Video",
  description: "Event highlights."
}
```

## 3. Add Google Drive material links

Inside the relevant subject in `app.js`, replace:

```js
url: "https://drive.google.com/"
```

with your actual shared Drive link.

Example:

```js
{
  name: "Chapter 1 Notes",
  type: "PDF / Drive",
  url: "https://drive.google.com/file/d/YOUR_FILE_ID/view"
}
```

For a folder:

```js
{
  name: "Complete Mathematics Folder",
  type: "Drive Folder",
  url: "https://drive.google.com/drive/folders/YOUR_FOLDER_ID"
}
```

Make sure the Drive file/folder sharing permission allows your students to access it.

# GitHub Pages hosting — easiest method

## Method A: GitHub website (no command line)

1. Sign in to GitHub.
2. Create a **new repository**.
3. Give it a name such as `tutorial-website`.
4. Keep the repository public if you want completely free GitHub Pages hosting.
5. Upload **all files and folders from this project**.
   - Upload `index.html`
   - Upload `app.js`
   - Upload the complete `assets` folder
   - Upload `README.md`
6. Open the repository's **Settings**.
7. Find **Pages** under the repository's Pages/build settings.
8. Set the source to deploy from a branch.
9. Select your main branch and the `/ (root)` folder.
10. Save.
11. GitHub will provide your Pages website address.

## Method B: Git command line

From this project folder:

```bash
git init
git add .
git commit -m "Initial tutorial website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

Then enable GitHub Pages in the repository settings as described above.

## Important: no build command is required

This project intentionally uses Vue 3 through its browser CDN build:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
```

So GitHub Pages can serve the files directly. There is no Node.js installation, npm command, backend, API server or database.

## Updating the website later

After the first deployment, you can simply edit `app.js` and replace the changed file in GitHub. GitHub Pages will redeploy it.

For larger content updates, you can edit the `courses`, `classes`, and `gallery` arrays in `app.js`.



## 4. Update contact, social media and location details

The same `site` object in `app.js` contains dummy contact information:

```js
const site = {
  contact: "+91 9900240025",
  email: "info@example.com",
  whatsapp: "919900240025",
  address: "123 Education Road, Bengaluru, Karnataka 560001, India",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=123+Education+Road+Bengaluru+Karnataka+560001",
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  youtube: "https://www.youtube.com/"
};
```

Replace each value with your real details.

### WhatsApp

Use the international number without `+`, spaces or hyphens:

```js
whatsapp: "919900240025"
```

For example, an Indian number beginning with `+91` becomes:

```text
919XXXXXXXXX
```

### Google Maps

Open Google Maps, find your institution, choose **Share → Copy link**, then paste the copied link into:

```js
mapUrl: "YOUR_GOOGLE_MAPS_LINK"
```

### Social media

Replace the dummy URLs:

```js
facebook: "https://www.facebook.com/YOUR_PAGE"
instagram: "https://www.instagram.com/YOUR_ACCOUNT"
youtube: "https://www.youtube.com/@YOUR_CHANNEL"
```

The website will automatically turn them into clickable social-media buttons.

## Custom domain

If you later buy a domain such as:

```text
www.yourinstitution.com
```

you can connect it to GitHub Pages through the repository's Pages settings and DNS records.

## Security / privacy note

Because this is a client-only website:

- Do not put passwords, private API keys or secret credentials in `app.js`.
- Do not place private student information in the public repository.
- Google Drive files/folders must be shared appropriately for students to access them.
- Anyone who can access a public Drive link may be able to open that material, depending on the Drive sharing setting.

## Recommended next customization

Replace the sample:
- Institution name
- Logo
- Banner
- Contact number
- Gallery images/videos
- Course names
- Subjects
- Google Drive links

The layout and interactions can remain unchanged.

## Faculty details

Faculty are managed in the `faculty` array in `app.js`. Each faculty member can have:

- Name
- Role/designation
- Subject
- Qualification and experience
- Short bio
- Email
- Photo

Replace the sample `assets/faculty-*.svg` files with your own JPG/PNG photos and update the `photo` path in `app.js`.

## Multiple institution locations

Branches are managed in the `locations` array in `app.js`. Add or remove branches using this structure:

```js
{
  name: "Your Branch Name",
  area: "Your Area",
  address: "Full branch address",
  phone: "+91 XXXXX XXXXX",
  whatsapp: "91XXXXXXXXXX",
  mapUrl: "https://www.google.com/maps/..."
}
```

Each branch automatically gets its own address, phone, WhatsApp button and Google Maps button.

For WhatsApp numbers, use the country code without `+`, spaces or hyphens.
