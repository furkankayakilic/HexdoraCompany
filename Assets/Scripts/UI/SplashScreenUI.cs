using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System.Collections;
using DunyaKasifi.Core;

namespace DunyaKasifi.UI
{
    public class SplashScreenUI : MonoBehaviour
    {
        [Header("UI Elements")]
        [SerializeField] private CanvasGroup mainCanvasGroup;
        [SerializeField] private Image logoImage;
        [SerializeField] private TextMeshProUGUI titleText;
        [SerializeField] private TextMeshProUGUI loadingText;
        [SerializeField] private Image progressBar;
        
        [Header("Animation Settings")]
        [SerializeField] private float fadeInDuration = 1f;
        [SerializeField] private float logoDisplayDuration = 2f;
        [SerializeField] private float fadeOutDuration = 1f;
        [SerializeField] private float progressBarFillDuration = 2f;
        
        [Header("Text Settings")]
        [SerializeField] private string gameTitle = "Dünya Keşfi";
        [SerializeField] private string loadingTextFormat = "Yükleniyor... {0}%";
        
        private GameManager gameManager;
        
        private void Awake()
        {
            gameManager = FindObjectOfType<GameManager>();
            InitializeUI();
        }
        
        private void Start()
        {
            StartCoroutine(PlaySplashScreenAnimation());
        }
        
        private void InitializeUI()
        {
            if (mainCanvasGroup == null)
                mainCanvasGroup = GetComponent<CanvasGroup>();
                
            if (titleText != null)
                titleText.text = gameTitle;
                
            if (progressBar != null)
                progressBar.fillAmount = 0f;
                
            if (loadingText != null)
                loadingText.text = string.Format(loadingTextFormat, 0);
        }
        
        private IEnumerator PlaySplashScreenAnimation()
        {
            // Başlangıçta UI'ı gizle
            mainCanvasGroup.alpha = 0f;
            
            // Fade in animasyonu
            float elapsedTime = 0f;
            while (elapsedTime < fadeInDuration)
            {
                elapsedTime += Time.deltaTime;
                mainCanvasGroup.alpha = Mathf.Lerp(0f, 1f, elapsedTime / fadeInDuration);
                yield return null;
            }
            mainCanvasGroup.alpha = 1f;
            
            // Logo gösterim süresi
            yield return new WaitForSeconds(logoDisplayDuration);
            
            // Progress bar animasyonu
            elapsedTime = 0f;
            while (elapsedTime < progressBarFillDuration)
            {
                elapsedTime += Time.deltaTime;
                float progress = elapsedTime / progressBarFillDuration;
                
                if (progressBar != null)
                    progressBar.fillAmount = progress;
                    
                if (loadingText != null)
                    loadingText.text = string.Format(loadingTextFormat, Mathf.RoundToInt(progress * 100));
                    
                yield return null;
            }
            
            // Fade out animasyonu
            elapsedTime = 0f;
            while (elapsedTime < fadeOutDuration)
            {
                elapsedTime += Time.deltaTime;
                mainCanvasGroup.alpha = Mathf.Lerp(1f, 0f, elapsedTime / fadeOutDuration);
                yield return null;
            }
            mainCanvasGroup.alpha = 0f;
            
            // Ana menüye geç
            if (gameManager != null)
            {
                gameManager.EnterMainMenu();
            }
        }
    }
} 