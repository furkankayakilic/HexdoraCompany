using UnityEngine;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;

public class ARManager : MonoBehaviour
{
    [SerializeField]
    private ARSession arSession;
    [SerializeField]
    private ARPlaneManager planeManager;
    [SerializeField]
    private ARRaycastManager raycastManager;

    private void Awake()
    {
        // AR desteğini kontrol et
        if (!CheckARSupport())
        {
            Debug.LogError("AR desteklenmiyor!");
            return;
        }
    }

    private bool CheckARSupport()
    {
        #if UNITY_ANDROID
        return ARSession.CheckAvailability().ToString() != "Unsupported";
        #elif UNITY_IOS
        return true; // iOS cihazlar ARKit destekliyorsa otomatik olarak çalışır
        #else
        return false;
        #endif
    }

    public void StartAR()
    {
        if (arSession != null)
        {
            arSession.enabled = true;
        }
        
        if (planeManager != null)
        {
            planeManager.enabled = true;
        }
    }

    public void StopAR()
    {
        if (arSession != null)
        {
            arSession.enabled = false;
        }
        
        if (planeManager != null)
        {
            planeManager.enabled = false;
        }
    }
} 