using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class AvatarKayit : MonoBehaviour
{
    public InputField isimInput;
    public Toggle erkekToggle;

    public static string kullaniciAdi = "Kaşif";
    public static string cinsiyet = "Erkek";

    public void DevamEt()
    {
        kullaniciAdi = isimInput.text == "" ? "Kaşif" : isimInput.text;
        cinsiyet = erkekToggle.isOn ? "Erkek" : "Kadın";
        SceneManager.LoadScene("ARScene");
    }
}
