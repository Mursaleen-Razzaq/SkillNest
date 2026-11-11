
/* ========================================
   SKILLNEST - LOCAL STORAGE MANAGER
   File: js/storage.js
======================================== */

const SkillNestStorage = {

    // Save data in browser
    save: function (key, data) {
        try {
            const formattedData = JSON.stringify(data);

            localStorage.setItem(
                "skillnest_" + key,
                formattedData
            );

            return true;

        } catch (error) {
            console.error("SkillNest: Unable to save data.", error);
            return false;
        }
    },

    // Get saved data from browser
    get: function (key, defaultValue = null) {
        try {
            const savedData = localStorage.getItem(
                "skillnest_" + key
            );

            if (savedData === null) {
                return defaultValue;
            }

            return JSON.parse(savedData);

        } catch (error) {
            console.error("SkillNest: Unable to read data.", error);
            return defaultValue;
        }
    },

    // Remove specific saved data
    remove: function (key) {
        try {
            localStorage.removeItem("skillnest_" + key);
            return true;

        } catch (error) {
            console.error("SkillNest: Unable to remove data.", error);
            return false;
        }
    },

    // Clear all SkillNest data only
    clearAll: function () {
        try {
            const keysToRemove = [];

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                if (key && key.startsWith("skillnest_")) {
                    keysToRemove.push(key);
                }
            }

            keysToRemove.forEach(function (key) {
                localStorage.removeItem(key);
            });

            return true;

        } catch (error) {
            console.error("SkillNest: Unable to clear data.", error);
            return false;
        }
    },

    // Check whether a key exists
    exists: function (key) {
        return localStorage.getItem("skillnest_" + key) !== null;
    }
};
