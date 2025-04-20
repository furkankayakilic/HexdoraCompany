using UnityEngine;
using System;
using System.Collections.Generic;

namespace DunyaKasifi.Education
{
    [System.Serializable]
    public class Achievement
    {
        public string id;
        public string title;
        public string description;
        public Sprite icon;
        public int points;
        public bool isUnlocked;
    }

    [System.Serializable]
    public class LanguageProgress
    {
        public string language;
        public int level;
        public List<string> learnedWords;
        public List<string> learnedPhrases;
    }

    [System.Serializable]
    public class CulturalKnowledge
    {
        public string country;
        public List<string> learnedTraditions;
        public List<string> learnedFoods;
        public List<string> learnedLandmarks;
    }

    public class EducationManager : MonoBehaviour
    {
        [SerializeField] private List<Achievement> achievements;
        [SerializeField] private List<LanguageProgress> languageProgress;
        [SerializeField] private List<CulturalKnowledge> culturalKnowledge;
        
        private int totalPoints;
        private int currentLevel;
        
        public event Action<Achievement> OnAchievementUnlocked;
        public event Action<int> OnPointsEarned;
        public event Action<int> OnLevelUp;
        public event Action<string, string> OnLanguageProgress;
        public event Action<string, string> OnCulturalKnowledgeGained;

        private void Start()
        {
            InitializeProgress();
        }

        private void InitializeProgress()
        {
            totalPoints = 0;
            currentLevel = 1;
            
            // Load saved progress if available
            LoadProgress();
        }

        public void AddPoints(int points)
        {
            totalPoints += points;
            OnPointsEarned?.Invoke(points);
            
            CheckLevelUp();
            SaveProgress();
        }

        private void CheckLevelUp()
        {
            int newLevel = CalculateLevel();
            if (newLevel > currentLevel)
            {
                currentLevel = newLevel;
                OnLevelUp?.Invoke(currentLevel);
            }
        }

        private int CalculateLevel()
        {
            // Simple level calculation based on total points
            return Mathf.FloorToInt(Mathf.Sqrt(totalPoints / 100)) + 1;
        }

        public void UnlockAchievement(string achievementId)
        {
            Achievement achievement = achievements.Find(a => a.id == achievementId && !a.isUnlocked);
            if (achievement != null)
            {
                achievement.isUnlocked = true;
                AddPoints(achievement.points);
                OnAchievementUnlocked?.Invoke(achievement);
                SaveProgress();
            }
        }

        public void AddLanguageProgress(string language, string wordOrPhrase)
        {
            LanguageProgress progress = languageProgress.Find(p => p.language == language);
            if (progress == null)
            {
                progress = new LanguageProgress
                {
                    language = language,
                    level = 1,
                    learnedWords = new List<string>(),
                    learnedPhrases = new List<string>()
                };
                languageProgress.Add(progress);
            }

            if (!progress.learnedWords.Contains(wordOrPhrase))
            {
                progress.learnedWords.Add(wordOrPhrase);
                OnLanguageProgress?.Invoke(language, wordOrPhrase);
                AddPoints(10); // Points for learning new words
                SaveProgress();
            }
        }

        public void AddCulturalKnowledge(string country, string knowledge, string category)
        {
            CulturalKnowledge culture = culturalKnowledge.Find(c => c.country == country);
            if (culture == null)
            {
                culture = new CulturalKnowledge
                {
                    country = country,
                    learnedTraditions = new List<string>(),
                    learnedFoods = new List<string>(),
                    learnedLandmarks = new List<string>()
                };
                culturalKnowledge.Add(culture);
            }

            List<string> targetList = null;
            switch (category.ToLower())
            {
                case "tradition":
                    targetList = culture.learnedTraditions;
                    break;
                case "food":
                    targetList = culture.learnedFoods;
                    break;
                case "landmark":
                    targetList = culture.learnedLandmarks;
                    break;
            }

            if (targetList != null && !targetList.Contains(knowledge))
            {
                targetList.Add(knowledge);
                OnCulturalKnowledgeGained?.Invoke(country, knowledge);
                AddPoints(15); // Points for learning cultural knowledge
                SaveProgress();
            }
        }

        public int GetLanguageLevel(string language)
        {
            LanguageProgress progress = languageProgress.Find(p => p.language == language);
            return progress?.level ?? 0;
        }

        public List<string> GetLearnedWords(string language)
        {
            LanguageProgress progress = languageProgress.Find(p => p.language == language);
            return progress?.learnedWords ?? new List<string>();
        }

        public List<Achievement> GetUnlockedAchievements()
        {
            return achievements.FindAll(a => a.isUnlocked);
        }

        private void SaveProgress()
        {
            // Implement save system
            // Save to PlayerPrefs or file system
        }

        private void LoadProgress()
        {
            // Implement load system
            // Load from PlayerPrefs or file system
        }

        public int GetTotalPoints()
        {
            return totalPoints;
        }

        public int GetCurrentLevel()
        {
            return currentLevel;
        }
    }
} 