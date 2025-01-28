export interface CourseType {
    title: string;
    description: string;
    originalPrice: string;
    price: string;
    discount: string;
    recommended?: boolean;
    features: string[];
    link: string;
}

// Hero block
export interface HeroData {
    heroTitle: string;
    heroSubtitle: string;
    discountBanner: string;
    courseTypes: CourseType[];
}

// Intro block
interface IntroPoint {
    title: string;
    description: string;
}

interface IntroData {
    mainTitle: string;
    mainSubtitle: string;
    paragraphs: string[];
    points: IntroPoint[];
    conclusion: string;
}

export interface PageContent {
    hero: HeroData;
    intro: IntroData;
}
