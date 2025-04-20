using UnityEngine;
using System;

namespace DunyaKasifi.Character
{
    [System.Serializable]
    public class CharacterCustomizationData
    {
        public int hairStyleIndex;
        public int eyeColorIndex;
        public int clothingIndex;
        public int accessoryIndex;
        public Color skinTone;
    }

    public class CharacterCustomization : MonoBehaviour
    {
        [SerializeField] private GameObject[] hairStyles;
        [SerializeField] private Material[] eyeMaterials;
        [SerializeField] private GameObject[] clothingOptions;
        [SerializeField] private GameObject[] accessories;
        [SerializeField] private SkinnedMeshRenderer characterMesh;

        private CharacterCustomizationData currentCustomization = new CharacterCustomizationData();

        public event Action<CharacterCustomizationData> OnCustomizationChanged;

        private void Start()
        {
            InitializeCharacter();
        }

        private void InitializeCharacter()
        {
            // Set default customization
            currentCustomization.hairStyleIndex = 0;
            currentCustomization.eyeColorIndex = 0;
            currentCustomization.clothingIndex = 0;
            currentCustomization.accessoryIndex = 0;
            currentCustomization.skinTone = Color.white;

            ApplyCustomization();
        }

        public void ChangeHairStyle(int index)
        {
            if (index >= 0 && index < hairStyles.Length)
            {
                // Disable all hair styles
                foreach (var hair in hairStyles)
                {
                    hair.SetActive(false);
                }

                // Enable selected hair style
                hairStyles[index].SetActive(true);
                currentCustomization.hairStyleIndex = index;
                OnCustomizationChanged?.Invoke(currentCustomization);
            }
        }

        public void ChangeEyeColor(int index)
        {
            if (index >= 0 && index < eyeMaterials.Length)
            {
                // Assuming the character mesh has an "Eyes" material slot
                Material[] materials = characterMesh.materials;
                materials[1] = eyeMaterials[index]; // Adjust index based on your material setup
                characterMesh.materials = materials;
                currentCustomization.eyeColorIndex = index;
                OnCustomizationChanged?.Invoke(currentCustomization);
            }
        }

        public void ChangeClothing(int index)
        {
            if (index >= 0 && index < clothingOptions.Length)
            {
                // Disable all clothing options
                foreach (var clothing in clothingOptions)
                {
                    clothing.SetActive(false);
                }

                // Enable selected clothing
                clothingOptions[index].SetActive(true);
                currentCustomization.clothingIndex = index;
                OnCustomizationChanged?.Invoke(currentCustomization);
            }
        }

        public void ChangeAccessory(int index)
        {
            if (index >= 0 && index < accessories.Length)
            {
                // Disable all accessories
                foreach (var accessory in accessories)
                {
                    accessory.SetActive(false);
                }

                // Enable selected accessory
                accessories[index].SetActive(true);
                currentCustomization.accessoryIndex = index;
                OnCustomizationChanged?.Invoke(currentCustomization);
            }
        }

        public void ChangeSkinTone(Color color)
        {
            currentCustomization.skinTone = color;
            // Apply skin tone to character material
            Material[] materials = characterMesh.materials;
            materials[0].color = color; // Adjust index based on your material setup
            characterMesh.materials = materials;
            OnCustomizationChanged?.Invoke(currentCustomization);
        }

        private void ApplyCustomization()
        {
            ChangeHairStyle(currentCustomization.hairStyleIndex);
            ChangeEyeColor(currentCustomization.eyeColorIndex);
            ChangeClothing(currentCustomization.clothingIndex);
            ChangeAccessory(currentCustomization.accessoryIndex);
            ChangeSkinTone(currentCustomization.skinTone);
        }

        public CharacterCustomizationData GetCurrentCustomization()
        {
            return currentCustomization;
        }
    }
} 