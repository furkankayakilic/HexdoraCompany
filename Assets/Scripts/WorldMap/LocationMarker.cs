using UnityEngine;
using UnityEngine.EventSystems;
using System;

namespace DunyaKasifi.WorldMap
{
    public class LocationMarker : MonoBehaviour, IPointerClickHandler
    {
        private Location locationData;
        public event Action<Location> OnMarkerClicked;

        [SerializeField] private SpriteRenderer iconRenderer;
        [SerializeField] private GameObject selectionIndicator;

        public void Initialize(Location location)
        {
            locationData = location;
            if (iconRenderer != null && location.icon != null)
            {
                iconRenderer.sprite = location.icon;
            }
            if (selectionIndicator != null)
            {
                selectionIndicator.SetActive(false);
            }
        }

        public void OnPointerClick(PointerEventData eventData)
        {
            OnMarkerClicked?.Invoke(locationData);
            if (selectionIndicator != null)
            {
                selectionIndicator.SetActive(true);
            }
        }

        public void SetSelected(bool selected)
        {
            if (selectionIndicator != null)
            {
                selectionIndicator.SetActive(selected);
            }
        }
    }
} 