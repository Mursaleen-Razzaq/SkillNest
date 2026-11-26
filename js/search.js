
/* ========================================
   SKILLNEST - GLOBAL HOMEPAGE SEARCH
   File: js/search.js
======================================== */

document.addEventListener("DOMContentLoaded", function () {

    const searchInput = document.getElementById("toolSearch");
    const searchButton = document.getElementById("searchButton");
    const searchMessage = document.getElementById("searchMessage");

    // Run only on the homepage search section
    if (!searchInput || !searchButton) {
        return;
    }

    // All SkillNest tools and learning resources
    const searchIndex = [

        // STUDENT TOOLS
        {
            title: "GPA Calculator",
            category: "Student Tool",
            description: "Calculate your Grade Point Average.",
            keywords: "gpa grade point average semester grades",
            url: "student-tools/gpa-calculator.html"
        },
        {
            title: "CGPA Calculator",
            category: "Student Tool",
            description: "Calculate your Cumulative Grade Point Average.",
            keywords: "cgpa cumulative grade point average overall grades",
            url: "student-tools/cgpa-calculator.html"
        },
        {
            title: "Percentage Calculator",
            category: "Student Tool",
            description: "Calculate percentages and marks.",
            keywords: "percentage marks percent calculate score",
            url: "student-tools/percentage-calculator.html"
        },
        {
            title: "Marks Calculator",
            category: "Student Tool",
            description: "Calculate marks and check your result.",
            keywords: "marks result calculator obtained total score",
            url: "student-tools/marks-calculator.html"
        },
        {
            title: "Study Planner",
            category: "Student Tool",
            description: "Organize your study schedule and tasks.",
            keywords: "study planner schedule subjects timetable planning",
            url: "student-tools/study-planner.html"
        },
        {
            title: "Exam Countdown",
            category: "Student Tool",
            description: "Track the time remaining until your exams.",
            keywords: "exam countdown date timer days test",
            url: "student-tools/exam-countdown.html"
        },

        // CAREER TOOLS
        {
            title: "Resume Builder",
            category: "Career Tool",
            description: "Create a professional resume.",
            keywords: "resume cv builder create professional job",
            url: "career-tools/resume-builder.html"
        },
        {
            title: "Cover Letter Generator",
            category: "Career Tool",
            description: "Generate a cover letter for job applications.",
            keywords: "cover letter generator application employment",
            url: "career-tools/cover-letter-generator.html"
        },
        {
            title: "Interview Practice",
            category: "Career Tool",
            description: "Practice common interview questions.",
            keywords: "interview practice questions answers hr technical",
            url: "career-tools/interview-practice.html"
        },
        {
            title: "Job Application Tracker",
            category: "Career Tool",
            description: "Organize and track your job applications.",
            keywords: "job application tracker jobs applications status",
            url: "career-tools/job-application-tracker.html"
        },
        {
            title: "Professional Email Generator",
            category: "Career Tool",
            description: "Prepare professional emails for work and applications.",
            keywords: "professional email generator writing work messages",
            url: "career-tools/professional-email-generator.html"
        },

        // PRODUCTIVITY TOOLS
        {
            title: "Pomodoro Timer",
            category: "Productivity Tool",
            description: "Manage focus sessions and breaks.",
            keywords: "pomodoro focus timer study work time management break",
            url: "productivity-tools/pomodoro-timer.html"
        },
        {
            title: "Word Counter",
            category: "Productivity Tool",
            description: "Count words and characters in your text.",
            keywords: "word counter character sentence paragraph writing text",
            url: "productivity-tools/word-counter.html"
        },
        {
            title: "To-Do List",
            category: "Productivity Tool",
            description: "Organize daily tasks and checklists.",
            keywords: "todo to do task list manager checklist daily planning",
            url: "productivity-tools/todo-list.html"
        },
        {
            title: "Flashcards",
            category: "Productivity Tool",
            description: "Create flashcards for study and revision.",
            keywords: "flashcards study memory learning revision questions answers",
            url: "productivity-tools/flashcards.html"
        },

        // LEARNING RESOURCES
        {
            title: "Resume Writing Guide",
            category: "Learning Resource",
            description: "Learn how to create a professional resume.",
            keywords: "resume cv writing guide format skills experience job",
            url: "resources/resume-writing-guide.html"
        },
        {
            title: "Internship Application Guide",
            category: "Learning Resource",
            description: "Learn how to find and apply for internships.",
            keywords: "internship guide application student experience opportunities email",
            url: "resources/internship-guide.html"
        },
        {
            title: "Interview Preparation Guide",
            category: "Learning Resource",
            description: "Prepare for interviews with practical advice and questions.",
            keywords: "interview preparation guide questions answers hr technical behavioral",
            url: "resources/interview-guide.html"
        },
        {
            title: "Study Tips and Productivity",
            category: "Learning Resource",
            description: "Improve your study routine and time management.",
            keywords: "study tips student time management focus exam preparation productivity learning",
            url: "resources/study-tips.html"
        }

    ];

    // Create the results container below the search message
    let resultsContainer = document.getElementById("globalSearchResults");

    if (!resultsContainer) {
        resultsContainer = document.createElement("div");
        resultsContainer.id = "globalSearchResults";
        resultsContainer.className = "global-search-results";

        if (searchMessage) {
            searchMessage.insertAdjacentElement("afterend", resultsContainer);
        } else {
            searchInput.closest(".search-box").insertAdjacentElement(
                "afterend",
                resultsContainer
            );
        }
    }

    // Normalize search text
    function normalizeText(value) {
        return value
            .toLowerCase()
            .trim()
            .replace(/\s+/g, " ");
    }

    // Search all tools and resources
    function searchTools() {

        const searchValue = normalizeText(searchInput.value);

        resultsContainer.replaceChildren();

        if (!searchValue) {
            if (searchMessage) {
                searchMessage.textContent =
                    "Please enter a tool or resource name to search.";
            }

            searchInput.focus();
            return;
        }

        const searchWords = searchValue.split(" ");

        const matchingResults = searchIndex.filter(function (item) {

            const searchableText = normalizeText(
                item.title + " " +
                item.category + " " +
                item.description + " " +
                item.keywords
            );

            return searchWords.every(function (word) {
                return searchableText.includes(word);
            });

        });

        // No results found
        if (matchingResults.length === 0) {

            if (searchMessage) {
                searchMessage.textContent =
                    "No matching tools or resources found. Try another keyword.";
            }

            return;
        }

        // Display result count
        if (searchMessage) {
            searchMessage.textContent =
                matchingResults.length +
                (matchingResults.length === 1
                    ? " matching result found."
                    : " matching results found.");
        }

        // Build clickable search results
        matchingResults.forEach(function (item) {

            const resultLink = document.createElement("a");
            resultLink.className = "global-search-result";
            resultLink.href = item.url;

            const resultTitle = document.createElement("h3");
            resultTitle.textContent = item.title;

            const resultCategory = document.createElement("span");
            resultCategory.className = "global-search-category";
            resultCategory.textContent = item.category;

            const resultDescription = document.createElement("p");
            resultDescription.textContent = item.description;

            const resultArrow = document.createElement("span");
            resultArrow.className = "global-search-arrow";
            resultArrow.textContent = "→";
            resultArrow.setAttribute("aria-hidden", "true");

            resultLink.append(
                resultTitle,
                resultCategory,
                resultDescription,
                resultArrow
            );

            resultsContainer.appendChild(resultLink);

        });

    }

    // Search button
    searchButton.addEventListener("click", searchTools);

    // Enter key
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            searchTools();
        }
    });

   // Show search results automatically while typing
searchInput.addEventListener("input", function () {

    if (!searchInput.value.trim()) {
        resultsContainer.replaceChildren();

        if (searchMessage) {
            searchMessage.textContent = "";
        }

        return;
    }

    searchTools();

});

});
