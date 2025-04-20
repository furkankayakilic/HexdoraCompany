using UnityEngine;
using System;
using System.Collections.Generic;

namespace DunyaKasifi.WorldMap
{
    [System.Serializable]
    public class Location
    {
        public string name;
        public string country;
        public Vector2 coordinates;
        public string description;
        public Sprite icon;
        public GameObject arModelPrefab;
        public List<string> availableActivities;
    }

    public class WorldMapManager : MonoBehaviour
    {
        [SerializeField] private Transform mapContainer;
        [SerializeField] private GameObject locationMarkerPrefab;
        [SerializeField] private LineRenderer routeLine;
        [SerializeField] private List<Location> locations;
        
        private Dictionary<string, GameObject> locationMarkers = new Dictionary<string, GameObject>();
        private List<Location> currentRoute = new List<Location>();
        
        public event Action<Location> OnLocationSelected;
        public event Action<List<Location>> OnRouteUpdated;

        private void Start()
        {
            InitializeMap();
        }

        private void InitializeMap()
        {
            foreach (var location in locations)
            {
                CreateLocationMarker(location);
            }
        }

        private void CreateLocationMarker(Location location)
        {
            Vector3 worldPosition = ConvertCoordinatesToWorldPosition(location.coordinates);
            GameObject marker = Instantiate(locationMarkerPrefab, worldPosition, Quaternion.identity, mapContainer);
            marker.name = $"Marker_{location.name}";
            
            // Set up marker visuals and interaction
            LocationMarker markerComponent = marker.GetComponent<LocationMarker>();
            if (markerComponent != null)
            {
                markerComponent.Initialize(location);
                markerComponent.OnMarkerClicked += HandleLocationSelected;
            }

            locationMarkers[location.name] = marker;
        }

        private Vector3 ConvertCoordinatesToWorldPosition(Vector2 coordinates)
        {
            // Convert lat/long to world position
            // This is a simplified conversion - you'll need to implement proper projection
            float x = (coordinates.x + 180f) / 360f * 10f - 5f;
            float z = (coordinates.y + 90f) / 180f * 10f - 5f;
            return new Vector3(x, 0, z);
        }

        private void HandleLocationSelected(Location location)
        {
            OnLocationSelected?.Invoke(location);
        }

        public void AddLocationToRoute(Location location)
        {
            if (!currentRoute.Contains(location))
            {
                currentRoute.Add(location);
                UpdateRouteVisualization();
                OnRouteUpdated?.Invoke(currentRoute);
            }
        }

        public void RemoveLocationFromRoute(Location location)
        {
            if (currentRoute.Contains(location))
            {
                currentRoute.Remove(location);
                UpdateRouteVisualization();
                OnRouteUpdated?.Invoke(currentRoute);
            }
        }

        private void UpdateRouteVisualization()
        {
            if (currentRoute.Count < 2)
            {
                routeLine.enabled = false;
                return;
            }

            routeLine.enabled = true;
            routeLine.positionCount = currentRoute.Count;

            for (int i = 0; i < currentRoute.Count; i++)
            {
                Vector3 position = ConvertCoordinatesToWorldPosition(currentRoute[i].coordinates);
                position.y = 0.1f; // Slightly above the map
                routeLine.SetPosition(i, position);
            }
        }

        public List<Location> GetCurrentRoute()
        {
            return new List<Location>(currentRoute);
        }

        public void ClearRoute()
        {
            currentRoute.Clear();
            UpdateRouteVisualization();
            OnRouteUpdated?.Invoke(currentRoute);
        }

        public Location GetLocationByName(string locationName)
        {
            return locations.Find(l => l.name == locationName);
        }

        public List<Location> GetLocationsByCountry(string country)
        {
            return locations.FindAll(l => l.country == country);
        }

        public void ShowLocationInfo(Location location)
        {
            // Implement UI display logic for location information
            Debug.Log($"Showing info for {location.name}: {location.description}");
        }
    }
} 