using UnityEngine;
using UnityEngine.SceneManagement;

public class SceneLoader : MonoBehaviour
{
    public void LoadAvatarScene()
    {
        SceneManager.LoadScene("AvatarScene");
    }
}