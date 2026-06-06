"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { defaultProfile } from "@/lib/defaultProfile";
import type { ProfileData, ProfileUpdate } from "@/lib/types";

const STORAGE_KEY = "ari-3d-portfolio-profile:v1";

type ProfileContextValue = {
  profile: ProfileData;
  updateProfile: (patch: ProfileUpdate) => void;
  setProfileImage: (dataUrl: string) => void;
  setModelUrl: (url: string, fileName: string) => void;
  updateSkillText: (
    section: "skills" | "researchWorkflow",
    clusterId: string,
    value: string
  ) => void;
  updateFieldExperienceText: (value: string) => void;
  resetProfile: () => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

function normalizeProfile(savedProfile?: Partial<ProfileData>): ProfileData {
  return {
    ...defaultProfile,
    ...savedProfile,
    profileImage:
      savedProfile?.profileImage && savedProfile.profileImage.trim() !== ""
        ? savedProfile.profileImage
        : defaultProfile.profileImage,
    modelUrl: defaultProfile.modelUrl,
    modelFileName: defaultProfile.modelFileName
  };
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(normalizeProfile());

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      setProfile(normalizeProfile());
      return;
    }

    try {
      const parsed = JSON.parse(saved) as Partial<ProfileData>;
      setProfile(normalizeProfile(parsed));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      setProfile(normalizeProfile());
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeProfile(profile)));
  }, [profile]);

  const updateProfile = useCallback((patch: ProfileUpdate) => {
    setProfile((current) => normalizeProfile({ ...current, ...patch }));
  }, []);

  const setProfileImage = useCallback((dataUrl: string) => {
    setProfile((current) =>
      normalizeProfile({
        ...current,
        profileImage: dataUrl || defaultProfile.profileImage
      })
    );
  }, []);

  // Upload 3D dinonaktifkan. Fungsi ini tetap ada agar komponen lama tidak error,
  // tetapi model selalu kembali ke model default.
  const setModelUrl = useCallback((_url: string, _fileName: string) => {
    setProfile((current) => normalizeProfile(current));
  }, []);

  const updateSkillText = useCallback(
    (section: "skills" | "researchWorkflow", clusterId: string, value: string) => {
      const items = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      setProfile((current) =>
        normalizeProfile({
          ...current,
          [section]: current[section].map((cluster) =>
            cluster.id === clusterId ? { ...cluster, items } : cluster
          )
        })
      );
    },
    []
  );

  const updateFieldExperienceText = useCallback((value: string) => {
    const items = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    setProfile((current) =>
      normalizeProfile({
        ...current,
        fieldExperience: items
      })
    );
  }, []);

  const resetProfile = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setProfile(normalizeProfile());
  }, []);

  const value = useMemo(
    () => ({
      profile,
      updateProfile,
      setProfileImage,
      setModelUrl,
      updateSkillText,
      updateFieldExperienceText,
      resetProfile
    }),
    [
      profile,
      updateProfile,
      setProfileImage,
      setModelUrl,
      updateSkillText,
      updateFieldExperienceText,
      resetProfile
    ]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error("useProfile must be used inside ProfileProvider");
  }

  return context;
}
