const { createApp, computed, ref, onMounted, onUnmounted } = Vue;

/*
  ============================================================
  EASY EDIT AREA
  ============================================================
  1. Change the institution name/contact/text below.
  2. Replace assets/banner.svg and assets/logo.svg if desired.
  3. Update gallery items with your own image/video URLs.
  4. Replace the sample Drive URLs under "classes" with your
     real Google Drive file/folder links.
*/

const site = {
  name: "Akkamahadevi Institute Of Mathematical Sciences",
  tagline: "Enhancing the abilities of students",
  contact: "+91 9900240027",
  email: "aim.akkamahadeviinstitute@gmail.com",
  whatsapp: "919900240027",
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/aim.akkamahadeviinstitute?utm_source=qr&stkn=dnNwdXUwNjh4cDhk",
  youtube: "https://youtube.com/@vinaysiddalingappa-h9g?si=Ji_tKgT3xhoUl2jb",
  logo: "assets/logo.png",
  banner: "assets/banner.png",
  heroEyebrow: "Trusted Tutorial Centre",
  heroTitle: "Build strong foundations. Achieve bigger goals.",
  heroText: "A modern learning hub for students from 6th standard to 2nd PUC, with courses, classroom moments and easy access to study materials."
};

const galleryImages = [
  { id: 1, src: "assets/image1.jpeg", title: "", description: "" },
  { id: 2, src: "assets/image2.jpeg", title: "", description: "" },
  { id: 3, src: "assets/image3.jpeg", title: "", description: "" },
  { id: 4, src: "assets/image4.jpeg", title: "", description: "" },
  { id: 5, src: "assets/image5.jpeg", title: "", description: "" }
];

const galleryVideos = [
  { id: 1, src: "assets/video1.mp4", title: "", description: "" }
];

const MATERIALS_API = "https://script.google.com/macros/s/AKfycbwJlc1GICnCYIpOrwvO66VEZcWGInuNu2oGBRNx6_O0i1h-wIO2BoirGQV0e8mhalI/exec";

// Change only the apiClass value if your Google Sheet uses a different class name.
const classApiValues = {
  "6th Standard": "6",
  "7th Standard": "7",
  "8th Standard": "8",
  "9th Standard": "9",
  "10th Standard": "10",
  "1st PUC": "1 PUC",
  "2nd PUC": "2 PUC"
};


const faculty = [
  {
    name: "Vinay Kumar",
    role: "Senior Faculty – Mathematics",
    subject: "Mathematics",
    qualification: "M.Sc., B.Ed., 18+ years teaching experience",
    bio: "Specializes in competitive problem solving and board examination preparation.",
    photo: "assets/faculty-1.jpg"
  },
  {
    name: "Ms. Sowmya M",
    role: "Faculty – Science",
    subject: "Science",
    qualification: "BSC,PGDMCA 2+ years teaching experience",
    bio: "Focuses on clear conceptual explanations and exam-oriented revision.",
    photo: "assets/faculty-2.jpg"
  }
];

const locations = [
  {
    name: "Mysuru Branch",
    area: "JSS Layout, Mysuru",
    address: "#18, 4th Block",
    phone: "+91 99002 40027",
    whatsapp: "919900240027",
    mapUrl: "https://maps.app.goo.gl/iKkvJ3CZz1J5TdFY6?g_st=ac"
  },
  {
    name: "K R Nagar Branch",
    area: "Hassan - Mysuru Road, K R Nagar",
    address: "Near K R Nagar Police Station",
    phone: "+91 99002 40027",
    whatsapp: "919900240027",
    mapUrl: "https://maps.app.goo.gl/qfksdRWv7oNbSWbL8"
  }
];

const courses = [
  { name: "School Foundation Program", level: "6th–8th", description: "Concept building, homework support and regular practice." },
  { name: "High School Program", level: "9th–10th", description: "Board-oriented preparation, revision and exam practice." },
  { name: "PUC Science Program", level: "1st–2nd PUC", description: "Focused preparation for Physics, Chemistry, Mathematics and Biology." },
  { name: "PUC Commerce Program", level: "1st–2nd PUC", description: "Guided learning for core commerce subjects and examinations." }
];

const classes = [
  { name: "6th Standard", subjects: ["Mathematics", "Science", "English"].map(name => ({ name })) },
  { name: "7th Standard", subjects: ["Mathematics", "Science", "English"].map(name => ({ name })) },
  { name: "8th Standard", subjects: ["Mathematics", "Science", "Social Science"].map(name => ({ name })) },
  { name: "9th Standard", subjects: ["Mathematics", "Science", "Social Science"].map(name => ({ name })) },
  { name: "10th Standard", subjects: ["Mathematics", "Science", "English"].map(name => ({ name })) },
  { name: "1st PUC", subjects: ["Physics", "Chemistry", "Mathematics", "Biology"].map(name => ({ name })) },
  { name: "2nd PUC", subjects: ["Physics", "Chemistry", "Mathematics", "Biology"].map(name => ({ name })) }
];


createApp({
  setup() {
    const mobileMenu = ref(false);

    // Image gallery state
    const activeImageSlide = ref(0);
    let imageTimer = null;

    // Materials state
    const selectedClass = ref(classes[0].name);
    const selectedSubject = ref("");
    const materials = ref([]);
    const materialsLoading = ref(false);
    const materialsError = ref("");

    const selectedClassObject = computed(() =>
      classes.find(c => c.name === selectedClass.value) || classes[0]
    );

    const subjectsForSelectedClass = computed(() =>
      selectedClassObject.value.subjects || []
    );

    const materialsForSelectedSubject = computed(() => materials.value);

    const nextImageSlide = () => {
      if (!galleryImages.length) return;
      activeImageSlide.value = (activeImageSlide.value + 1) % galleryImages.length;
    };

    const previousImageSlide = () => {
      if (!galleryImages.length) return;
      activeImageSlide.value = (activeImageSlide.value - 1 + galleryImages.length) % galleryImages.length;
    };

    const goToImageSlide = (index) => {
      activeImageSlide.value = index;
    };

    const startImageGallery = () => {
      if (imageTimer || galleryImages.length <= 1) return;
      imageTimer = setInterval(nextImageSlide, 4500);
    };

    const pauseImageGallery = () => {
      clearInterval(imageTimer);
      imageTimer = null;
    };

    const resetImageGallery = () => {
      activeImageSlide.value = 0;
    };

    const downloadUrl = (material) => {
      if (!material.fileId) return "";
      return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(material.fileId)}`;
    };

    const normalizeMaterial = (item) => ({
      className: item.Class ?? item.class ?? "",
      subject: item.Subject ?? item.subject ?? "",
      name: item.Topic ?? item.topic ?? "Study Material",
      url: item["Material Link"] ?? item.materialLink ?? item.url ?? "",
      fileId: item["File Id"] ?? item["File ID"] ?? item.fileId ?? ""
    });

    const fetchMaterials = async () => {
      const apiClass = classApiValues[selectedClass.value] || selectedClass.value;
      const subject = selectedSubject.value;

      materials.value = [];
      materialsError.value = "";
      materialsLoading.value = true;

      try {
        const url = `${MATERIALS_API}?class=${encodeURIComponent(apiClass)}&subject=${encodeURIComponent(subject)}`;
        const response = await fetch(url, { method: "GET" });

        // Only an HTTP status other than exactly 200 is treated as a request failure.
        // A successful HTTP 200 with zero records should show the Coming Soon state.
        if (response.status !== 200) {
          throw new Error(`Request failed (${response.status})`);
        }

        const result = await response.json();

        // Do not treat an empty result as an error. The UI will show Coming Soon
        // whenever the successful response contains no usable material records.
        materials.value = Array.isArray(result.data)
          ? result.data.map(normalizeMaterial).filter(item => item.name || item.url || item.fileId)
          : [];
      } catch (error) {
        console.error("Materials request failed:", error);
        materialsError.value = "Unable to load materials right now. Please try again.";
        materials.value = [];
      } finally {
        materialsLoading.value = false;
      }
    };

    const selectClass = (name) => {
      selectedClass.value = name;
      selectedSubject.value = "";
      materials.value = [];
      materialsError.value = "";
      resetImageGallery();
    };

    const selectSubject = (name) => {
      selectedSubject.value = name;
      fetchMaterials();
    };

    onMounted(startImageGallery);
    onUnmounted(() => clearInterval(imageTimer));

    return {
      site, galleryImages, galleryVideos, courses, classes, faculty, locations,
      mobileMenu,
      activeImageSlide,
      selectedClass, selectedSubject,
      selectedClassObject, subjectsForSelectedClass, materialsForSelectedSubject,
      materialsLoading, materialsError,
      nextImageSlide, previousImageSlide, goToImageSlide,
      startImageGallery, pauseImageGallery,
      selectClass, selectSubject, fetchMaterials, downloadUrl
    };
  }
}).mount("#app");
