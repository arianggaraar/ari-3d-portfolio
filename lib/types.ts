export type SkillCluster = {
  id: string;
  title: string;
  items: string[];
};

export type ProfileData = {
  name: string;
  phone: string;
  email: string;
  headline: string;
  summary: string;
  profileImage?: string;
  modelUrl?: string;
  modelFileName?: string;
  skills: SkillCluster[];
  researchWorkflow: SkillCluster[];
  fieldExperience: string[];
};

export type ProfileUpdate = Partial<Omit<ProfileData, "skills" | "researchWorkflow" | "fieldExperience">>;
