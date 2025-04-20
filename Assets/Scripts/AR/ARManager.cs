using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using System.Collections.Generic;
using System;

namespace DunyaKasifi.AR
{
    public class ARManager : MonoBehaviour
    {
        [SerializeField] private ARSession arSession;
        [SerializeField] private ARSessionOrigin arSessionOrigin;
        [SerializeField] private ARPlaneManager planeManager;
        [SerializeField] private ARRaycastManager raycastManager;
        [SerializeField] private GameObject arContentPrefab;

        private List<ARRaycastHit> hits = new List<ARRaycastHit>();
        private GameObject spawnedContent;

        public event Action<bool> OnARSessionStateChanged;
        public event Action<Vector3> OnContentPlaced;

        private void Awake()
        {
            if (arSession == null)
                arSession = FindObjectOfType<ARSession>();
            if (arSessionOrigin == null)
                arSessionOrigin = FindObjectOfType<ARSessionOrigin>();
            if (planeManager == null)
                planeManager = FindObjectOfType<ARPlaneManager>();
            if (raycastManager == null)
                raycastManager = FindObjectOfType<ARRaycastManager>();
        }

        private void OnEnable()
        {
            arSession.stateChanged += HandleARSessionStateChanged;
        }

        private void OnDisable()
        {
            arSession.stateChanged -= HandleARSessionStateChanged;
        }

        private void HandleARSessionStateChanged(ARSessionStateChangedEventArgs args)
        {
            OnARSessionStateChanged?.Invoke(args.state == ARSessionState.SessionTracking);
        }

        public void StartARSession()
        {
            if (ARSession.state == ARSessionState.None || ARSession.state == ARSessionState.CheckingAvailability)
            {
                StartCoroutine(CheckAndStartAR());
            }
        }

        private System.Collections.IEnumerator CheckAndStartAR()
        {
            yield return ARSession.CheckAvailability();

            if (ARSession.state == ARSessionState.Unsupported)
            {
                Debug.LogError("AR is not supported on this device");
                yield break;
            }

            yield return ARSession.Install();

            arSession.enabled = true;
            arSessionOrigin.enabled = true;
            planeManager.enabled = true;
            raycastManager.enabled = true;
        }

        public void StopARSession()
        {
            arSession.enabled = false;
            arSessionOrigin.enabled = false;
            planeManager.enabled = false;
            raycastManager.enabled = false;

            if (spawnedContent != null)
            {
                Destroy(spawnedContent);
                spawnedContent = null;
            }
        }

        public bool TryPlaceContent(Vector2 screenPosition)
        {
            if (raycastManager.Raycast(screenPosition, hits, TrackableType.Planes))
            {
                var hitPose = hits[0].pose;
                
                if (spawnedContent == null)
                {
                    spawnedContent = Instantiate(arContentPrefab, hitPose.position, hitPose.rotation);
                }
                else
                {
                    spawnedContent.transform.position = hitPose.position;
                    spawnedContent.transform.rotation = hitPose.rotation;
                }

                OnContentPlaced?.Invoke(hitPose.position);
                return true;
            }

            return false;
        }

        public void RotateContent(float angle)
        {
            if (spawnedContent != null)
            {
                spawnedContent.transform.Rotate(Vector3.up, angle);
            }
        }

        public void ScaleContent(float scale)
        {
            if (spawnedContent != null)
            {
                spawnedContent.transform.localScale *= scale;
            }
        }

        public void ResetContent()
        {
            if (spawnedContent != null)
            {
                spawnedContent.transform.localScale = Vector3.one;
                spawnedContent.transform.localRotation = Quaternion.identity;
            }
        }
    }
} 