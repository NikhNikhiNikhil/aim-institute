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

const gallery = [
  {
    id: 1,
    type: "image",
    src: "assets/image1.jpeg",
    title: "",
    description: ""
  },
  {
    id: 2,
    type: "image",
    src: "assets/image2.jpeg",
    title: "",
    description: ""
  },
  {
    id: 3,
    type: "image",
    src: "assets/image3.jpeg",
    title: "",
    description: ""
  },
  {
    id: 4,
    type: "image",
    src: "assets/image4.jpeg",
    title: "",
    description: ""
  },
  {
    id: 5,
    type: "image",
    src: "assets/image5.jpeg",
    title: "",
    description: ""
  },
  {
     id: 6,
     type: "video",
     src: "assets/video1.mp4",
     title: "",
     description: ""
  }
];

const faculty = [
  {
    name: "Vinay Kumar",
    role: "Senior Faculty – Mathematics",
    subject: "Mathematics",
    qualification: "M.Sc., B.Ed., 18+ years teaching experience",
    bio: "Specializes in competitive problem solving and board examination preparation.",
    email: "vinaykumar@gmail.com",
    photo: "assets/faculty-1.svg"
  },
  {
    name: "Ms. Sowmya M",
    role: "Faculty – Science",
    subject: "Science",
    qualification: "BSC,PGDMCA 2+ years teaching experience",
    bio: "Focuses on clear conceptual explanations and exam-oriented revision.",
    email: "sowmya@example.com",
    photo: "assets/faculty-2.svg"
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
  {
    name: "6th Standard",
    subjects: [
      { name: "Mathematics", materials: [
        { name: "Chapter 1 Notes", type: "PDF / Drive", url: "https://drive.google.com/" },
        { name: "Practice Worksheet", type: "Drive Folder", url: "https://drive.google.com/" }
      ]},
      { name: "Science", materials: [
        { name: "Science Notes", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]},
      { name: "English", materials: [
        { name: "Grammar Practice", type: "Drive Folder", url: "https://drive.google.com/" }
      ]}
    ]
  },
  {
    name: "7th Standard",
    subjects: [
      { name: "Mathematics", materials: [
        { name: "Mathematics Notes", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]},
      { name: "Science", materials: [
        { name: "Science Materials", type: "Drive Folder", url: "https://drive.google.com/" }
      ]},
      { name: "English", materials: [
        { name: "English Materials", type: "Drive Folder", url: "https://drive.google.com/" }
      ]}
    ]
  },
  {
    name: "8th Standard",
    subjects: [
      { name: "Mathematics", materials: [
        { name: "Maths Notes", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]},
      { name: "Science", materials: [
        { name: "Science Notes", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]},
      { name: "Social Science", materials: [
        { name: "Social Science Notes", type: "Drive Folder", url: "https://drive.google.com/" }
      ]}
    ]
  },
  {
    name: "9th Standard",
    subjects: [
      { name: "Mathematics", materials: [
        { name: "Maths Revision Pack", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]},
      { name: "Science", materials: [
        { name: "Science Revision Pack", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]},
      { name: "Social Science", materials: [
        { name: "Social Science Pack", type: "Drive Folder", url: "https://drive.google.com/" }
      ]}
    ]
  },
  {
    name: "10th Standard",
    subjects: [
      { name: "Mathematics", materials: [
        { name: "Board Revision Materials", type: "PDF / Drive", url: "https://drive.google.com/" },
        { name: "Previous Question Papers", type: "Drive Folder", url: "https://drive.google.com/" }
      ]},
      { name: "Science", materials: [
        { name: "Science Board Pack", type: "Drive Folder", url: "https://drive.google.com/" }
      ]},
      { name: "English", materials: [
        { name: "English Revision", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]}
    ]
  },
  {
    name: "1st PUC",
    subjects: [
      { name: "Physics", materials: [
        { name: "Physics Notes", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]},
      { name: "Chemistry", materials: [
        { name: "Chemistry Notes", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]},
      { name: "Mathematics", materials: [
        { name: "Mathematics Notes", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]},
      { name: "Biology", materials: [
        { name: "Biology Notes", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]}
    ]
  },
  {
    name: "2nd PUC",
    subjects: [
      { name: "Physics", materials: [
        { name: "Physics Board Revision", type: "PDF / Drive", url: "https://drive.google.com/" },
        { name: "Previous Question Papers", type: "Drive Folder", url: "https://drive.google.com/" }
      ]},
      { name: "Chemistry", materials: [
        { name: "Chemistry Board Revision", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]},
      { name: "Mathematics", materials: [
        { name: "Mathematics Board Revision", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]},
      { name: "Biology", materials: [
        { name: "Biology Board Revision", type: "PDF / Drive", url: "https://drive.google.com/" }
      ]}
    ]
  }
];

createApp({
  setup() {
    const mobileMenu = ref(false);
    const activeSlide = ref(0);
    const selectedClass = ref(classes[0].name);
    const selectedSubject = ref("");

    let timer = null;

    const selectedClassObject = computed(() =>
      classes.find(c => c.name === selectedClass.value) || classes[0]
    );

    const subjectsForSelectedClass = computed(() =>
      selectedClassObject.value.subjects || []
    );

    const materialsForSelectedSubject = computed(() => {
      const subject = subjectsForSelectedClass.value.find(s => s.name === selectedSubject.value);
      return subject ? subject.materials : [];
    });

    const nextSlide = () => {
      activeSlide.value = (activeSlide.value + 1) % gallery.length;
    };

    const previousSlide = () => {
      activeSlide.value = (activeSlide.value - 1 + gallery.length) % gallery.length;
    };

    const goToSlide = (index) => {
      activeSlide.value = index;
    };

    const startGallery = () => {
      if (timer || gallery.length <= 1) return;
      timer = setInterval(nextSlide, 4500);
    };

    const pauseGallery = () => {
      clearInterval(timer);
      timer = null;
    };

    const selectClass = (name) => {
      selectedClass.value = name;
      selectedSubject.value = "";
    };

    const selectSubject = (name) => {
      selectedSubject.value = name;
    };

    onMounted(startGallery);
    onUnmounted(() => clearInterval(timer));

    return {
      site, gallery, courses, classes, faculty, locations, mobileMenu,
      activeSlide, selectedClass, selectedSubject,
      selectedClassObject, subjectsForSelectedClass, materialsForSelectedSubject,
      nextSlide, previousSlide, goToSlide, startGallery, pauseGallery,
      selectClass, selectSubject
    };
  }
}).mount("#app");
