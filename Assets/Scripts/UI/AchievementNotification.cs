using UnityEngine;
using TMPro;
using UnityEngine.UI;
using System.Collections;

namespace DunyaKasifi.UI
{
    public class AchievementNotification : MonoBehaviour
    {
        [SerializeField] private TextMeshProUGUI titleText;
        [SerializeField] private TextMeshProUGUI descriptionText;
        [SerializeField] private Image iconImage;
        [SerializeField] private float displayDuration = 3f;
        [SerializeField] private float fadeDuration = 0.5f;
        
        private CanvasGroup canvasGroup;

        private void Awake()
        {
            canvasGroup = GetComponent<CanvasGroup>();
            if (canvasGroup == null)
            {
                canvasGroup = gameObject.AddComponent<CanvasGroup>();
            }
        }

        public void Initialize(string title, string description, Sprite icon = null)
        {
            if (titleText != null)
                titleText.text = title;
            
            if (descriptionText != null)
                descriptionText.text = description;
            
            if (iconImage != null && icon != null)
                iconImage.sprite = icon;

            StartCoroutine(ShowAndHide());
        }

        private IEnumerator ShowAndHide()
        {
            // Fade in
            yield return FadeCanvas(0f, 1f, fadeDuration);

            // Wait
            yield return new WaitForSeconds(displayDuration);

            // Fade out
            yield return FadeCanvas(1f, 0f, fadeDuration);

            // Destroy the notification
            Destroy(gameObject);
        }

        private IEnumerator FadeCanvas(float startAlpha, float endAlpha, float duration)
        {
            float elapsedTime = 0f;
            while (elapsedTime < duration)
            {
                elapsedTime += Time.deltaTime;
                canvasGroup.alpha = Mathf.Lerp(startAlpha, endAlpha, elapsedTime / duration);
                yield return null;
            }
            canvasGroup.alpha = endAlpha;
        }
    }
} 