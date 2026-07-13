const slideImage = document.getElementById("slide-image");
const slideContainer = document.querySelector(".slide-container");
const homeBtn = document.getElementById("home-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const studentDropdownLinks = document.querySelectorAll("#students-book-dropdown a");
const activityDropdownLinks = document.querySelectorAll("#activity-book-dropdown a");
const dropdownBtns = document.querySelectorAll(".dropdown-btn");

const audioBtn = document.getElementById("audio-btn");
const audioListContainer = document.getElementById("audio-list-container");
const audioPlayer = document.getElementById("slide-audio");
const audioSource = document.getElementById("audio-source");
const hideAudioBtn = document.getElementById("hide-audio-btn");

// Show audio player and hide button
function showAudioPlayer() {
    audioPlayer.style.display = "block";
    hideAudioBtn.style.display = "inline-block";
}

// Hide audio player when hide button is clicked
hideAudioBtn.addEventListener("click", () => {
    audioPlayer.style.display = "none";
    hideAudioBtn.style.display = "none";
});
let currentImages = [];
let currentIndex = 0;
let currentScale = 1;

// ==========================
// SAVE CURRENT PAGE STATE
// ==========================
function saveCurrentState(bookType, unit, pageNum) {
    localStorage.setItem("pptkb1State", JSON.stringify({ bookType, unit, pageNum }));
}
// ==========================
// DROPDOWN TOGGLE
// ==========================
dropdownBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const parentDropdown = btn.parentElement;
        document.querySelectorAll('.dropdown').forEach(d => {
            if(d !== parentDropdown) d.classList.remove('show');
        });
        parentDropdown.classList.toggle('show');
    });
});

window.addEventListener("click", () => {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show'));
});

// ==========================
// LOAD IMAGE FUNCTION
// ==========================
function autoFitImage() {
    const containerWidth = slideContainer.clientWidth;
    const containerHeight = slideContainer.clientHeight;
    const imgWidth = slideImage.naturalWidth;
    const imgHeight = slideImage.naturalHeight;

    const scaleX = containerWidth / imgWidth;
    const scaleY = containerHeight / imgHeight;

    currentScale = Math.min(scaleX, scaleY);

    slideImage.style.width = imgWidth * currentScale + "px";
    slideImage.style.height = imgHeight * currentScale + "px";
}

function loadImage(src) {
    slideImage.onload = function() {
        autoFitImage();
    };
    slideImage.src = src;
}

// ==========================
// HOME PAGE
// ==========================
function loadHome() {
    currentImages = [];
    currentIndex = 0;
    loadImage("images/homepage.jpeg");
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
}

// ==========================
// STUDENT BOOK
// ==========================
function loadStudentUnit(unitNumber) {
    currentImages = [];
    currentIndex = 0;

    const folderName = "unit_" + unitNumber;
    const basePath = `images/student-book-pages/${folderName}/`;

    let pageNumbers = [];
    switch(unitNumber) {
        case "1": pageNumbers = [4,5,6,7,8,9]; break;
        case "2": pageNumbers = [10,11,12,13,14,15,16,17]; break;
        case "3": pageNumbers = [18,19,20,21,22,23]; break;
        case "4": pageNumbers = [24,25,26,27,28,29,30,31]; break;
        case "5": pageNumbers = [34,35,36,37,38,39]; break;
        case "6": pageNumbers = [40,41,42,43,44,45,46,47]; break;
        case "7": pageNumbers = [48,49,50,51,52,53]; break;
        case "8": pageNumbers = [54,55,56,57,58,59,60,61]; break;
        case "9": pageNumbers = [64,65,66,67,68,69]; break;
        case "10": pageNumbers = [70,71,72,73,74,75,76,77]; break;
        case "11": pageNumbers = [78,79,80,81,82,83]; break;
        case "12": pageNumbers = [84,85,86,87,88,89,90,91]; break;
        default: pageNumbers = []; break;
    }

    pageNumbers.forEach(num => {
        currentImages.push(basePath + "page" + num + ".JPG");
    });

    loadImage(currentImages[currentIndex]);
    prevBtn.style.display = "block";
    nextBtn.style.display = "block";
}

// ==========================
// ACTIVITY BOOK
// ==========================
function loadActivityUnit(unitNumber) {
    currentImages = [];
    currentIndex = 0;

    const folderName = "unit_" + unitNumber;
    const basePath = `images/activity-book-pages/${folderName}/`;

    let pageNumbers = [];
    switch(unitNumber) {
        case "1": pageNumbers = [4,5,6,7,8,9]; break;
        case "2": pageNumbers = [10,11,12,13,14,15,16,17]; break;
        case "3": pageNumbers = [18,19,20,21,22,23]; break;
        case "4": pageNumbers = [24,25,26,27,28,29,30,31]; break;
        case "5": pageNumbers = [34,35,36,37,38,39]; break;
        case "6": pageNumbers = [40,41,42,43,44,45,46,47]; break;
        case "7": pageNumbers = [48,49,50,51,52,53]; break;
        case "8": pageNumbers = [54,55,56,57,58,59,60,61]; break;
        case "9": pageNumbers = [64,65,66,67,68,69]; break;
        case "10": pageNumbers = [70,71,72,73,74,75,76,77]; break;
        case "11": pageNumbers = [78,79,80,81,82,83]; break;
        case "12": pageNumbers = [84,85,86,87,88,89,90,91]; break;
        default: pageNumbers = []; break;
    }

    pageNumbers.forEach(num => {
        currentImages.push(basePath + "page" + num + ".JPG");
    });

    if (currentImages.length > 1) {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
    } else {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
    }

    loadImage(currentImages[currentIndex]);
}

// ==========================
// DROPDOWN EVENTS
// ==========================
studentDropdownLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const unit = link.getAttribute("data-unit");
        loadStudentUnit(unit);
        // Save state
        saveCurrentState(
            "student",
            unit,
            parseInt(currentImages[currentIndex].match(/page(\d+)/)[1])
        );
    });
});

activityDropdownLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const unit = link.getAttribute("data-unit");
        loadActivityUnit(unit);
        // Save state
        saveCurrentState(
            "activity",
            unit,
            parseInt(currentImages[currentIndex].match(/page(\d+)/)[1])
        );
    });
});

// ==========================
// NAVIGATION
// ==========================
prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        loadImage(currentImages[currentIndex]);
         // Save state
        saveCurrentState(
            currentImages[currentIndex].includes("student-book-pages") ? "student" : "activity",
            currentImages[currentIndex].match(/unit_(\d+)/)[1],
            currentImages[currentIndex].match(/page(\d+)/)[1]
        );
    }
});

nextBtn.addEventListener("click", () => {
    if (currentIndex < currentImages.length - 1) {
        currentIndex++;
        loadImage(currentImages[currentIndex]);
         // Save state
        saveCurrentState(
            currentImages[currentIndex].includes("student-book-pages") ? "student" : "activity",
            currentImages[currentIndex].match(/unit_(\d+)/)[1],
            currentImages[currentIndex].match(/page(\d+)/)[1]
        );
    }
});

// ==========================
// CTRL + WHEEL ZOOM
// ==========================
slideContainer.addEventListener("wheel", function(e) {
    if (!e.ctrlKey) return;
    e.preventDefault();

    if (e.deltaY < 0) currentScale += 0.1;
    else currentScale -= 0.1;
    if (currentScale < 0.1) currentScale = 0.1;

    slideImage.style.width = slideImage.naturalWidth * currentScale + "px";
    slideImage.style.height = slideImage.naturalHeight * currentScale + "px";

    resizeEditCanvas();
    function resizeEditCanvas(){

    const rect = slideImage.getBoundingClientRect();

    editCanvas.width = rect.width;
    editCanvas.height = rect.height;

    editCanvas.style.left = slideImage.offsetLeft + "px";
    editCanvas.style.top = slideImage.offsetTop + "px";

}
}, { passive: false });

// ==========================
// HOME BUTTON
// ==========================
homeBtn.addEventListener("click", function(e) {
    e.preventDefault();
    loadHome();
});

window.addEventListener("load", () => {
    const navigationEntries = performance.getEntriesByType("navigation");
    const isReload = navigationEntries.length > 0 && navigationEntries[0].type === "reload";

    if (isReload) {
        // Page was refreshed → restore previous state if exists
        const savedState = localStorage.getItem("pptkb1State");
        if (savedState) {
            const { bookType, unit, pageNum } = JSON.parse(savedState);
            if (bookType === "student") {
                loadStudentUnit(unit);
                currentIndex = currentImages.findIndex(src => src.includes(`page${pageNum}.JPG`));
                if (currentIndex >= 0) loadImage(currentImages[currentIndex]);
            } else if (bookType === "activity") {
                loadActivityUnit(unit);
                currentIndex = currentImages.findIndex(src => src.includes(`page${pageNum}.JPG`));
                if (currentIndex >= 0) loadImage(currentImages[currentIndex]);
            }
        } else {
            loadHome(); // fallback if nothing saved
        }
    } else {
        // First time opening → always Home
        loadHome();
    }
});

// ==========================
// AUDIO FUNCTIONALITY FOR ALL UNITS
// ==========================

audioBtn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
  // TOGGLE: hide if already visible
    if (audioListContainer.style.display === "flex") {
        audioListContainer.style.display = "none";
        return;
    }
    // Clear previous buttons
    audioListContainer.innerHTML = "";
    audioListContainer.style.display = "flex";

    if (currentImages.length === 0) return;

    const pageSrc = currentImages[currentIndex];

    // Determine if Student or Activity Book
    let bookType;
    if (pageSrc.includes("student-book-pages")) bookType = "student";
    else if (pageSrc.includes("activity-book-pages")) bookType = "activity";
    else return;

    // Extract unit number
    const unitMatch = pageSrc.match(/unit_(\d+)/i);
    if (!unitMatch) return;
    const unit = parseInt(unitMatch[1]);

    // Extract page number
    const pageMatch = pageSrc.match(/page(\d+)/i);
    if (!pageMatch) return;
    const pageNum = parseInt(pageMatch[1]);

    // Define audio tracks for all units (Student Book)
    const studentBookAudioTracks = {
        1: {4:["page4_Track_2","page4_Track_3"],5:["page5_Track_4","page5_Track_5"],6:["page6_Track_6","page6_Track_7"],7:["page7_Track_8","page7_Track_9","page7_Track_10"],8:["page8_Track_11"],9:["page9_Track_12"]},
        2: {10:["page10_Track_13","page10_Track_14"],11:["page11_Track_15","page11_Track_16"],12:["page12_Track_17","page12_Track_18"],13:["page13_Track_19","page13_Track_20"],14:["page14_Track_21"],15:["page15_Track_22"],16:["page16_Track_23"],17:["page17_Track_24","page17_Track_25"]},
        3: {18:["page18_Track_26","page18_Track_27"],19:["page19_Track_28","page19_Track_29"],20:["page20_Track_30","page20_Track_31"],21:["page21_Track_32","page21_Track_33"],22:["page22_Track_34"],23:["page23_Track_35","page23_Track_36"]},
        4: {24:["page24_Track_37","page24_Track_38"],25:["page25_Track_39","page25_Track_40"],26:["page26_Track_41","page26_Track_42"],27:["page27_Track_43","page27_Track_44","page27_Track_45"],28:["page28_Track_46"],29:["page29_Track_47","page29_Track_48"],30:["page30_Track_49"],31:["page31_Track_50","page31_Track_51"],32:["page32_Track_52"],33:["page33_Track_53"]},
        5: {34:["page34_Track_54","page34_Track_55"],35:["page35_Track_56","page35_Track_57"],36:["page36_Track_58","page36_Track_59"],37:["page37_Track_60","page37_Track_61","page37_Track_61"],38:["page38_Track_63"],39:["page39_Track_64"]},
        6: {40:["page40_Track_65","page40_Track_66"],41:["page41_Track_67","page41_Track_68"],42:["page42_Track_69","page42_Track_70"],43:["page43_Track_71","page43_Track_72"],28:["page28_Track_46"],29:["page29_Track_47","page29_Track_48"],30:["page30_Track_49"],31:["page31_Track_50","page31_Track_51"],32:["page32_Track_52"],33:["page33_Track_53"]},
        7: {48:["page48_Track_78","page48_Track_79"],49:["page49_Track_80","page49_Track_81"],50:["page50_Track_82","page50_Track_83"],51:["page51_Track_84","page51_Track_85"],52:["page52_Track_86"],53:["page53_Track_87"]},
        8: {54:["page54_Track_88","page54_Track_89"],55:["page55_Track_90","page55_Track_91"],56:["page56_Track_92","page56_Track_93"],57:["page57_Track_94","page57_Track_95","page57_Track_96"],58:["page58_Track_97"],59:["page59_Track_98","page59_Track_99"],60:["page60_Track_100"],61:["page61_Track_101"]},
        9: {64:["page64_Track_103","page64_Track_104"],65:["page65_Track_105","page65_Track_106","page65_Track_107"],66:["page66_Track_108","page66_Track_109"],67:["page67_Track_110"],68:["page68_Track_111"],69:["page69_Track_112"]},
        10: {70:["page70_Track_113","page70_Track_114"],71:["page71_Track_115","page71_Track_116"],72:["page72_Track_117","page72_Track_118"],73:["page73_Track_119","page73_Track_120"],74:["page74_Track_121"],75:["page75_Track_122","page75_Track_123"],76:["page76_Track_124"],77:["page77_Track_125","page77_Track_126"]},
        11: {78:["page78_Track_127","page78_Track_128"],79:["page79_Track_129","page79_Track_130","page79_Track_131"],80:["page80_Track_123","page80_Track_133"],81:["page81_Track_124","page81_Track_135"],82:["page82_Track_136"],83:["page83_Track_137","page83_Track_138"]},
        12: {84:["page84_Track_139","page84_Track_140"],85:["page85_Track_141","page85_Track_142"],86:["page86_Track_143","page86_Track_144"],87:["page87_Track_145","page87_Track_146"],88:["page88_Track_147"],89:["page89_Track_148"],90:["page90_Track_149"],91:["page91_Track_150","page91_Track_151"] }
    };

    // Define audio tracks for all units (Activity Book)
    const activityBookAudioTracks = {
        1: {4:["page4_Track_02"],6:["page6_Track_03"],7:["page7_Track_04"]},
        2: {10:["page10_Track_05"],12:["page12_Track_06"],16:["page16_Track_07"]},
        3: {18:["page18_Track_08"],19:["page19_Track_09"],20:["page20_Track_10"],21:["page21_Track_11"],22:["page22_Track_12"]},
        4: {24:["page24_Track_13"],25:["page25_Track_14"],26:["page26_Track_15"],28:["page28_Track_16"]},
        5: {34:["page34_Track_18"],36:["page36_Track_19"],38:["page38_Track_20"]},
        6: {40:["page40_Track_21"],41:["page41_Track_22"],42:["page42_Track_23"],46:["page46_Track_24"]},
        7: {48:["page48_Track_25"],50:["page50_Track_26"],52:["page52_Track_27"]},
        8: {54:["page54_Track_28"],55:["page55_Track_29"],56:["page56_Track_30","page56_Track_31"],57:["page57_Track_32"],60:["page60_Track_33"],62:["page62_Track_34"]},
        9: {64:["page64_Track_35"],66:["page66_Track_36"]},
        10: {70:["page70_Track_37"],72:["page72_Track_38"],73:["page73_Track_39"]},
        11: {78:["page78_Track_40"],80:["page80_Track_41"]},
        12: {84:["page84_Track_42"],86:["page86_Track_43"],87:["page87_Track_44"] }
    };

    // Pick the correct track list
    let tracks;
    if (bookType === "student") tracks = studentBookAudioTracks[unit] ? studentBookAudioTracks[unit][pageNum] || [] : [];
    else tracks = activityBookAudioTracks[unit] ? activityBookAudioTracks[unit][pageNum] || [] : [];

    if (tracks.length === 0) {
        
        return;
    }

    // Create buttons for each track
    tracks.forEach(track => {
        const btn = document.createElement("button");
        const trackNumber = track.split("_")[2]; // get number
        btn.textContent = `Audio ${trackNumber}`;

        btn.addEventListener("click", () => {
            const folder = bookType === "student" ? "student_book_audios" : "activity_book_audios";
            audioSource.src = `audio/${folder}/unit_${unit}/${track}.mp3`;
            audioPlayer.load();
            showAudioPlayer(); // <-- use the new function
            audioPlayer.controls = true;
        });

        audioListContainer.appendChild(btn);
    });
});

// Hide audio list if click outside
window.addEventListener("click", () => {
    audioListContainer.style.display = "none";
});
// ==========================
// VIDEO FUNCTIONALITY FOR UNIT 1
// ==========================

const videoBtn = document.querySelector('a img[alt="Videos"]').parentElement;
const videoListContainer = document.createElement("div");
videoListContainer.id = "video-list-container";
document.body.appendChild(videoListContainer);

const videoPlayer = document.getElementById("slide-video");
const videoSource = document.getElementById("video-source");
const hideVideoBtn = document.getElementById("hide-video-btn");

// Show video player and hide button
function showVideoPlayer() {
    videoPlayer.style.display = "block";
    hideVideoBtn.style.display = "inline-block";
}

// Hide video player when hide button is clicked
hideVideoBtn.addEventListener("click", () => {
    videoPlayer.pause();
    videoPlayer.style.display = "none";
    hideVideoBtn.style.display = "none";
});

// Double-click to toggle fullscreen
videoPlayer.addEventListener("dblclick", () => {
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen().catch(err => console.log(err));
    } else {
        document.exitFullscreen();
    }
});

// Define videos for Unit 1
const unitVideos = {
    1: {
        6: ["KidsBox_Level1_Unit1_Language_video"],
        7: ["KidsBox_Level1_Unit1_Song_video","KidsBox_Level1_Unit1_Karaoke_video"],
        8: ["KidsBox_Level1_Unit1_Montys_sounds_and_spelling_video"],
        9: ["KidsBox_Level1_Unit1_Story_video"]
    },
    2: {
        12:["KidsBox_Level1_Unit2_Language_video"],
        13:["KidsBox_Level1_Unit2_Song_video","KidsBox_Level1_Unit2_Karaoke_video"],
        14:["KidsBox_Level1_Unit2_Montys_sounds_and_spelling_video"],
        15:["KidsBox_Level1_Unit2_Story_video"],
        16:["KidsBox_Level1_Unit2_CLIL_video"],
    },
    3: {
        20:["KidsBox_Level1_Unit3_Language_video"],
        21:["KidsBox_Level1_Unit3_Song_video","KidsBox_Level1_Unit3_Karaoke_video"],
        22:["KidsBox_Level1_Unit3_Montys_sounds_and_spelling_video"],
        },
    4: {
        26:["KidsBox_Level1_Unit4_Language_video"],
        27:["KidsBox_Level1_Unit4_Song_video","KidsBox_Level1_Unit4_Karaoke_video"],
        28:["KidsBox_Level1_Unit4_Montys_sounds_and_spelling_video"],
        29:["KidsBox_Level1_Unit4_Story_video"],
        30:["KidsBox_Level1_Unit4_CLIL_video"],
    },
    5: {
        36: ["KidsBox_Level1_Unit5_Language_video"],
        37: ["KidsBox_Level1_Unit5_Song_video","KidsBox_Level1_Unit5_Karaoke_video"],
        38: ["KidsBox_Level1_Unit5_Montys_sounds_and_spelling_video"],
        39: ["KidsBox_Level1_Unit5_Story_video"]
    },
    6: {
        42:["KidsBox_Level1_Unit6_Language_video"],
        43:["KidsBox_Level1_Unit6_Song_video","KidsBox_Level1_Unit6_Karaoke_video"],
        44:["KidsBox_Level1_Unit6_Montys_sounds_and_spelling_video"],
        45:["KidsBox_Level1_Unit6_Story_video"],
        46:["KidsBox_Level1_Unit6_CLIL_video"],
    },
    7: {
        50: ["KidsBox_Level1_Unit7_Language_video"],
        51: ["KidsBox_Level1_Unit7_Song_video","KidsBox_Level1_Unit7_Karaoke_video"],
        52: ["KidsBox_Level1_Unit7_Montys_sounds_and_spelling_video"],
        53: ["KidsBox_Level1_Unit7_Story_video"]
    },
    8: {
        56: ["KidsBox_Level1_Unit8_Language_video"],
        57: ["KidsBox_Level1_Unit8_Song_video","KidsBox_Level1_Unit8_Karaoke_video"],
        58: ["KidsBox_Level1_Unit8_Montys_sounds_and_spelling_video"],
        59: ["KidsBox_Level1_Unit8_Story_video"],
        60: ["video/unit_8/KidsBox_Level1_Unit8_CLIL_video.mp4"],
         },
     9: {
        65: ["KidsBox_Level1_Unit9_Song_video","KidsBox_Level1_Unit9_Karaoke_video"],
        66: ["KidsBox_Level1_Unit9_Language_video"],
        68: ["KidsBox_Level1_Unit9_Montys_sounds_and_spelling_video"],
        69: ["KidsBox_Level1_Unit9_Story_video"]
    },
    10: {
        72: ["KidsBox_Level1_Unit10_Language_video"],
        73: ["KidsBox_Level1_Unit10_Song_video","KidsBox_Level1_Unit10_Karaoke_video"],
        74: ["KidsBox_Level1_Unit10_Montys_sounds_and_spelling_video"],
        75: ["KidsBox_Level1_Unit10_Story_video"],
        76: ["KidsBox_Level1_Unit10_CLIL_video"],
         },
    11: {
        80: ["KidsBox_Level1_Unit11_Language_video"],
        81: ["KidsBox_Level1_Unit11_Song_video","KidsBox_Level1_Unit11_Karaoke_video"],
        82: ["KidsBox_Level1_Unit11_Montys_sounds_and_spelling_video"],
        83: ["KidsBox_Level1_Unit11_Story_video"],
         },
     12: {
        86: ["KidsBox_Level1_Unit12_Language_video"],
        87: ["KidsBox_Level1_Unit12_Song_video","KidsBox_Level1_Unit12_Karaoke_video"],
        88: ["KidsBox_Level1_Unit12_Montys_sounds_and_spelling_video"],
        89: ["KidsBox_Level1_Unit12_Story_video"],
        90: ["KidsBox_Level1_Unit12_CLIL_video"],
         },
     }
// Click event for video icon (Student Book only)
videoBtn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
   // TOGGLE: hide if already visible
    if (videoListContainer.style.display === "flex") {
        videoListContainer.style.display = "none";
        return;
    }

    // Clear previous buttons
    videoListContainer.innerHTML = "";
    videoListContainer.style.display = "flex";

    if (currentImages.length === 0) return;

    const pageSrc = currentImages[currentIndex];

    // ONLY show videos for Student Book pages
    if (!pageSrc.includes("student-book-pages")) return; // <- key change

    // Extract unit number
    const unitMatch = pageSrc.match(/unit_(\d+)/i);
    if (!unitMatch) return;
    const unit = parseInt(unitMatch[1]);

    // Extract page number
    const pageMatch = pageSrc.match(/page(\d+)/i);
    if (!pageMatch) return;
    const pageNum = parseInt(pageMatch[1]);

    // Get videos for this page
    const tracks = unitVideos[unit] ? unitVideos[unit][pageNum] || [] : [];

    if (tracks.length === 0) return; // <- do nothing if no videos

    tracks.forEach((track, index) => {
        const btn = document.createElement("button");
        btn.textContent = `Video ${index + 1}`;

        btn.addEventListener("click", () => {
            videoSource.src = `video/unit_${unit}/${track}.mp4`;
            videoPlayer.load();
            showVideoPlayer();
        });

        videoListContainer.appendChild(btn);
    });
});

// Hide video list if click outside
window.addEventListener("click", () => {
    videoListContainer.style.display = "none";
});
// ==========================
// EDIT TRAY TOGGLE SYSTEM
// ==========================

const editBtn = document.getElementById("edit-btn");
const editTray = document.getElementById("edit-tray");
const pencilTool = document.getElementById("pencil-tool");
editBtn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    if (editTray.style.display === "flex") {
        editTray.style.display = "none";
    } else {
        editTray.style.display = "flex";
    }
});
// WHITEBOARD TOGGLE
const whiteboardBtn = document.getElementById("whiteboard-btn");
const whiteboard = document.getElementById("whiteboard");

whiteboardBtn.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    // Toggle visibility
    if (whiteboard.style.display === "flex") {
        whiteboard.style.display = "none";
        editTray.style.display = "none"; // hide edit tray too
    } else {
        whiteboard.style.display = "flex"; 
        editTray.style.display = "flex"; // show edit tray when whiteboard opens
    }
});

// HIDE WHITEBOARD IF STUDENT OR ACTIVITY BOOK ICON CLICKED
studentDropdownLinks.forEach(link => {
    link.addEventListener("click", () => {
        whiteboard.style.display = "none";
        editTray.style.display = "none";
    });
});

activityDropdownLinks.forEach(link => {
    link.addEventListener("click", () => {
        whiteboard.style.display = "none";
        editTray.style.display = "none";
    });
});
activityDropdownLinks.forEach(link => {
    link.addEventListener("click", () => {
        whiteboard.style.display = "none";
        editTray.style.display = "none";
    });
});

// ==========================
// WHITEBOARD CANVAS SETUP
// ==========================
const whiteboardCanvas = document.getElementById("whiteboard-canvas");
const wbCtx = whiteboardCanvas.getContext("2d");

// Make whiteboard canvas always match whiteboard size
function resizeWhiteboardCanvas() {
    whiteboardCanvas.width = whiteboard.offsetWidth;
    whiteboardCanvas.height = whiteboard.offsetHeight;
}
resizeWhiteboardCanvas(); // initial sizing
window.addEventListener("resize", resizeWhiteboardCanvas);
// ==========================
// PENCIL SIZE SELECTOR
// ==========================

const pencilSizeMenu = document.getElementById("pencil-size-menu");
const sizeOptions = document.querySelectorAll(".size-option");

// Toggle size menu when pencil clicked
pencilTool.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    // Close other floating panels
    audioListContainer.style.display = "none";
    videoListContainer.style.display = "none";
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show'));

    // Toggle size menu
    if (pencilSizeMenu.style.display === "flex") {
        pencilSizeMenu.style.display = "none";
    } else {
        pencilSizeMenu.style.display = "flex";
    }
});

// Select size
sizeOptions.forEach(option => {
    option.addEventListener("click", (e) => {
        e.stopPropagation();
        pencilSize = parseInt(option.getAttribute("data-size"));
        pencilSizeMenu.style.display = "none";
    });
});
document.addEventListener("click", function(e) {
    if (!pencilSizeMenu.contains(e.target) && e.target !== pencilTool) {
        pencilSizeMenu.style.display = "none";
    }
});
// ===== WHITEBOARD DRAWING ======
(() => { // IIFE to avoid global conflicts
    (() => {
    const whiteboardCanvas = document.getElementById("whiteboard-canvas");
    const ctx = whiteboardCanvas.getContext("2d");

    let drawing = false;
    let currentStroke = null;
    let strokes = [];
    let pencilSize = 3;
    let pencilColor = "red";

    // Resize canvas to match image
    function resizeEditCanvas() {
        const rect = slideImage.getBoundingClientRect();
        whiteboardCanvas.width = rect.width;
        whiteboardCanvas.height = rect.height;
        whiteboardCanvas.style.left = slideImage.offsetLeft + "px";
        whiteboardCanvas.style.top = slideImage.offsetTop + "px";
        redrawStrokes();
    }
    
    window.addEventListener("resize", resizeEditCanvas);
    slideImage.addEventListener("load", () => setTimeout(resizeEditCanvas, 100));
    resizeEditCanvas();

    function redrawStrokes() {
        ctx.clearRect(0, 0, whiteboardCanvas.width, whiteboardCanvas.height);
        strokes.forEach(stroke => {
            if (!stroke.points.length) return;
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.size;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.beginPath();
            stroke.points.forEach((p, i) => {
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            });
            ctx.stroke();
        });
    }
    // ==========================
// WHITEBOARD DRAWING ENGINE
// ==========================
const wbCanvas = document.getElementById("whiteboard-canvas");
const wbCtx = wbCanvas.getContext("2d");

let wbDrawing = false;
let wbCurrentTool = "pencil"; // default tool
let wbLineWidth = 2;           // default line size
let wbStrokeStyle = "#000000"; // default color
let wbStartX = 0;
let wbStartY = 0;

    function eraseAt(x, y) {
        const radius = 10; // Eraser radius in px
        strokes = strokes.flatMap(stroke => {
            if (stroke.type !== "stroke") return [stroke];
            let newStrokes = [];
            let currentPoints = [];
            for (let p of stroke.points) {
                const dx = p.x - x;
                const dy = p.y - y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance > radius) {
                    currentPoints.push(p);
                } else if (currentPoints.length) {
                    newStrokes.push({ ...stroke, points: currentPoints });
                    currentPoints = [];
                }
            }
            if (currentPoints.length) newStrokes.push({ ...stroke, points: currentPoints });
            return newStrokes;
        });
        redrawStrokes();
    }

    whiteboardCanvas.addEventListener("mousedown", e => {
        const rect = whiteboardCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (currentTool === "eraser") {
            drawing = true;
            eraseAt(x, y);
            return;
        }

        if (currentTool === "pencil" || currentTool === "pen" || currentTool === "marker") {
            drawing = true;
            let color = currentTool === "pen" ? "blue" : currentTool === "marker" ? "rgba(255,255,0,0.4)" : pencilColor;
            let size = currentTool === "marker" ? 18 : currentTool === "pen" ? 4 : pencilSize;
            currentStroke = { type: "stroke", color, size, points: [{ x, y }] };
            strokes.push(currentStroke);
        }

        if (currentTool === "text") {
            createTextBox(x, y);
        }
    });

    whiteboardCanvas.addEventListener("mousemove", e => {
        if (!drawing) return;
        const rect = whiteboardCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (currentTool === "eraser") eraseAt(x, y);
        else if (currentTool === "pencil" || currentTool === "pen" || currentTool === "marker") {
            currentStroke.points.push({ x, y });
            redrawStrokes();
        }
    });

    whiteboardCanvas.addEventListener("mouseup", () => {
        drawing = false;
        currentStroke = null;
    });

    whiteboardCanvas.addEventListener("mouseout", () => {
        drawing = false;
        currentStroke = null;
    });
})();
})();
// ==========================
// TOOL MODE SYSTEM
// ==========================

let currentTool = "pencil";

const penTool = document.getElementById("pen-tool");
const eraserTool = document.getElementById("eraser-tool");
const highlightTool = document.getElementById("highlight-tool");
const textTool = document.getElementById("text-tool");

pencilTool.addEventListener("click", () => currentTool = "pencil");
penTool.addEventListener("click", () => currentTool = "pen");
eraserTool.addEventListener("click", () => currentTool = "eraser");
highlightTool.addEventListener("click", () => currentTool = "marker");
textTool.addEventListener("click", () => currentTool = "text");
function updateCursor() {
    if (!whiteboardCanvas) return;
    if (currentTool === "eraser") whiteboardCanvas.style.cursor = "crosshair";
    else if (currentTool === "text") whiteboardCanvas.style.cursor = "text";
    else whiteboardCanvas.style.cursor = "pointer"; // pencil, pen, marker
}

// Update cursor whenever a tool is clicked
[pencilTool, penTool, highlightTool, eraserTool, textTool].forEach(toolBtn => {
    toolBtn.addEventListener("click", updateCursor);
});
updateCursor(); // initialize on load
// ==========================
// PROFESSIONAL SLIDE DRAWING ENGINE
// ==========================

const editCanvas = document.getElementById("edit-canvas");
const editCtx = editCanvas.getContext("2d");
function createTextBox(x, y) {
    const container = document.createElement("div");
    container.classList.add("text-box");
    container.contentEditable = true; // now editable directly
    container.style.left = x + "px";
    container.style.top = y + "px";
    container.style.fontSize = "20px";
    container.style.color = "#000";
    container.style.fontFamily = "Arial";
    container.style.minWidth = "80px";
    container.style.minHeight = "24px";
    container.style.border = "1px solid #888";
    container.style.padding = "2px 4px";
    container.style.background = "#fff";
    container.style.position = "absolute";
    container.style.zIndex = "1000";

    slideContainer.appendChild(container);

    // === Toolbar ===
    const toolbar = document.createElement("div");
    toolbar.classList.add("text-box-toolbar");

    // Increase font size
    const increaseBtn = document.createElement("button");
    increaseBtn.textContent = "+";
    increaseBtn.addEventListener("click", () => {
        const size = parseInt(window.getComputedStyle(container).fontSize);
        container.style.fontSize = (size + 2) + "px";
    });
    toolbar.appendChild(increaseBtn);

    // Decrease font size
    const decreaseBtn = document.createElement("button");
    decreaseBtn.textContent = "−";
    decreaseBtn.addEventListener("click", () => {
        const size = parseInt(window.getComputedStyle(container).fontSize);
        container.style.fontSize = Math.max(size - 2, 8) + "px";
    });
    toolbar.appendChild(decreaseBtn);

    // Color picker
    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = "#000000";
    colorInput.addEventListener("input", () => container.style.color = colorInput.value);
    toolbar.appendChild(colorInput);

    // Bold
    const boldBtn = document.createElement("button");
    boldBtn.textContent = "B";
    boldBtn.style.fontWeight = "bold";
    boldBtn.addEventListener("click", () => {
        container.style.fontWeight = container.style.fontWeight === "bold" ? "normal" : "bold";
    });
    toolbar.appendChild(boldBtn);

    // Italic
    const italicBtn = document.createElement("button");
    italicBtn.textContent = "I";
    italicBtn.style.fontStyle = "italic";
    italicBtn.addEventListener("click", () => {
        container.style.fontStyle = container.style.fontStyle === "italic" ? "normal" : "italic";
    });
    toolbar.appendChild(italicBtn);

    // Delete
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";
    deleteBtn.addEventListener("click", () => {
        container.remove();
        toolbar.remove();
        if (activeTextBox && activeTextBox.container === container) activeTextBox = null;
    });
    toolbar.appendChild(deleteBtn);

    slideContainer.appendChild(toolbar);

    // Update toolbar position
    function updateToolbar() {
        const rect = container.getBoundingClientRect();
        toolbar.style.left = rect.left + "px";
        toolbar.style.top = rect.top - toolbar.offsetHeight - 5 + "px";
    }
    updateToolbar();

    // Make toolbar follow text box
    window.addEventListener("resize", updateToolbar);

    // Dragging text box
    let isDragging = false;
    let offsetX, offsetY;

    container.addEventListener("mousedown", (e) => {
        if (currentTool !== "text") return;
        isDragging = true;
        const rect = container.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        e.preventDefault();
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        container.style.left = e.clientX - offsetX + "px";
        container.style.top = e.clientY - offsetY + "px";
        updateToolbar();
    });

    window.addEventListener("mouseup", () => isDragging = false);

    return {container, toolbar};
}
let strokes = [];
let currentStroke = null;
let drawing = false;
let drawMode = false;
let pencilSize = 3;
let pencilColor = "red";

// Resize canvas
function resizeEditCanvas(){

    const rect = slideImage.getBoundingClientRect();

    editCanvas.width = rect.width;
    editCanvas.height = rect.height;

    editCanvas.style.left = slideImage.offsetLeft + "px";
    editCanvas.style.top = slideImage.offsetTop + "px";

    redrawStrokes();
}

window.addEventListener("resize", resizeEditCanvas);

slideImage.addEventListener("load", () => {
    setTimeout(resizeEditCanvas,100);
});

// ==========================
// ACTIVATE PENCIL
// ==========================

pencilTool.addEventListener("click", () => {
    drawMode = true;
});
// ==========================
// ERASER FUNCTION
// ==========================
function eraseAt(x, y) {
    const radius = 0.01; // adjust eraser size

    strokes = strokes.flatMap(stroke => {
        if (stroke.type !== "stroke") return [stroke];

        let newStrokes = [];
        let currentPoints = [];

        for (let i = 0; i < stroke.points.length; i++) {
            const p = stroke.points[i];
            const dx = p.x - x;
            const dy = p.y - y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > radius) {
                currentPoints.push(p);
            } else {
                // if we hit a point, save previous points as a stroke
                if (currentPoints.length > 0) {
                    newStrokes.push({
                        type: "stroke",
                        color: stroke.color,
                        size: stroke.size,
                        points: currentPoints
                    });
                    currentPoints = [];
                }
            }
        }

        // Add remaining points
        if (currentPoints.length > 0) {
            newStrokes.push({
                type: "stroke",
                color: stroke.color,
                size: stroke.size,
                points: currentPoints
            });
        }

        return newStrokes;
    });
}
// ==========================
// SIMPLE TEXT TOOL
// ==========================

editCanvas.addEventListener("click", (e) => {
    if (currentTool !== "text") return;

    const rect = editCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type...";

    input.style.position = "absolute";
    input.style.left = (editCanvas.offsetLeft + x) + "px";
    input.style.top = (editCanvas.offsetTop + y) + "px";

    input.style.fontSize = "20px";
    input.style.color = "blue";
    input.style.border = "none";
    input.style.outline = "none";
    input.style.background = "transparent";
    input.style.zIndex = 3000;

    document.body.appendChild(input);
    input.focus();

    input.addEventListener("blur", () => {
        const text = input.value;

        if (text.trim() !== "") {
            editCtx.fillStyle = "blue";
            editCtx.font = "20px Arial";
            editCtx.fillText(text, x, y);
        }

        input.remove();
    });
});
// ==========================
// DRAW START
// ==========================
editCanvas.addEventListener("mousedown", (e) => {
    const rect = editCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / editCanvas.width;
    const y = (e.clientY - rect.top) / editCanvas.height;

    if (currentTool === "eraser") {
        eraseAt(x, y);
        redrawStrokes();
        drawing = true; // allow continuous erasing while moving
        return;
    }

    if (!drawMode) return;

    drawing = true;

    let color = "red";
    let size = pencilSize;

    if (currentTool === "pen") {
        color = "blue";
        size = 4;
    }

    if (currentTool === "marker") {
        color = "rgba(255,255,0,0.4)";
        size = 18;
    }

    currentStroke = {
        type: "stroke",
        size: size,
        color: color,
        points: [{ x, y }]
    };
    strokes.push(currentStroke);
});

// ==========================
// DRAW MOVE
// ==========================

editCanvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;

    const rect = editCanvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / editCanvas.width;
    const y = (e.clientY - rect.top) / editCanvas.height;

    if (currentTool === "eraser") {
        eraseAt(x, y);
        redrawStrokes();
        return;
    }

    if (!drawMode) return;

    currentStroke.points.push({ x, y });
    redrawStrokes();
});

// ==========================
// DRAW END
// ==========================

editCanvas.addEventListener("mouseup",()=> drawing=false);
editCanvas.addEventListener("mouseleave",()=> drawing=false);

// ==========================
// REDRAW ALL STROKES
// ==========================

function redrawStrokes() {
    // Clear canvas first
    editCtx.clearRect(0, 0, editCanvas.width, editCanvas.height);

    // Loop through all strokes
    strokes.forEach(item => {
        if(item.type === "stroke") {
            // Set style
            editCtx.strokeStyle = item.color;
            editCtx.lineWidth = item.size;
            editCtx.lineCap = "round";
            editCtx.lineJoin = "round";

            // Begin drawing path
            editCtx.beginPath();

            item.points.forEach((p, i) => {
                // Scale points according to canvas size
                const x = p.x * editCanvas.width;
                const y = p.y * editCanvas.height;

                if(i === 0) editCtx.moveTo(x, y);
                else editCtx.lineTo(x, y);
            });

            editCtx.stroke();
        }

        if(item.type === "text") {
            // Set text style
            editCtx.fillStyle = "black";  // you can make color dynamic later
            editCtx.font = `${24 * editCanvas.width / 1600}px Arial`; // scale with canvas width

            // Scale position
            const x = item.x * editCanvas.width;
            const y = item.y * editCanvas.height;

            editCtx.fillText(item.text, x, y);
        }
    });
}
const clearWB = document.getElementById("clear-whiteboard");

clearWB.addEventListener("click", () => {
    strokes = [];
    wbCtx.clearRect(0, 0, wbCanvas.width, wbCanvas.height);
    localStorage.removeItem("whiteboardData");
});
// ==========================
// SIMPLE PASSWORD LOGIN
// ==========================

const loginScreen = document.getElementById("login-screen");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");

// CHANGE YOUR PASSWORD HERE
const APP_PASSWORD = "1234";

loginBtn.addEventListener("click", () => {
    const value = passwordInput.value;

    if (value === APP_PASSWORD) {
        loginScreen.style.display = "none";
    } else {
        loginError.style.display = "block";
    }
});
// ==========================
// ZOOM + PAN SYSTEM (FINAL FIXED)
// ==========================

// ---- SCALE LIMITS ----
const MIN_SCALE = 1;
const MAX_SCALE = 2.0;

// ---- STATE ----

let initialDistance = null;
let pinchStartScale = 1;

// ---- PAN (drag) ----
let translateX = 0;
let translateY = 0;

let startX = 0;
let startY = 0;
let isDragging = false;

// ---- DOUBLE TAP ----
let lastTap = 0;

// ==========================
// HELPERS
// ==========================

function getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function applyZoom() {
    slideImage.style.transform =
        "translate(" + translateX + "px, " + translateY + "px) scale(" + currentScale + ")";
    slideImage.style.transformOrigin = "center center";

    // safer than optional chaining
    if (typeof resizeEditCanvas === "function") {
        resizeEditCanvas();
    }
}

// ==========================
// TOUCH START
// ==========================

slideContainer.addEventListener("touchstart", function (e) {

    // PINCH START
    if (e.touches.length === 2) {
        initialDistance = getTouchDistance(e.touches);
        pinchStartScale = currentScale;
        isDragging = false;
    }

    // DRAG START
    if (e.touches.length === 1 && currentScale > 1) {
        isDragging = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
    }

});

// ==========================
// TOUCH MOVE
// ==========================

slideContainer.addEventListener("touchmove", function (e) {

    // PINCH ZOOM
    if (e.touches.length === 2 && initialDistance) {
        e.preventDefault();

        const newDistance = getTouchDistance(e.touches);
        const scaleFactor = newDistance / initialDistance;

        currentScale = pinchStartScale * scaleFactor;

        // LIMIT SCALE
        if (currentScale < MIN_SCALE) currentScale = MIN_SCALE;
        if (currentScale > MAX_SCALE) currentScale = MAX_SCALE;

        applyZoom();
    }

    // DRAG / PAN
    else if (isDragging && e.touches.length === 1) {
        e.preventDefault();

        translateX = e.touches[0].clientX - startX;
        translateY = e.touches[0].clientY - startY;

        applyZoom();
    }

}, { passive: false });

// ==========================
// TOUCH END
// ==========================

slideContainer.addEventListener("touchend", function (e) {

    // RESET PINCH
    if (e.touches.length < 2) {
        initialDistance = null;
    }

    // STOP DRAG
    if (e.touches.length === 0) {
        isDragging = false;
    }

    // DOUBLE TAP
    const now = Date.now();

    if (now - lastTap < 300) {
        if (currentScale === 1) {
            currentScale = 1.3;
        } else {
            currentScale = 1;
            translateX = 0;
            translateY = 0;
        }

        applyZoom();
    }

    lastTap = now;

});