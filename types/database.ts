export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      lena_page_sections: {
        Row: {
          section_key: string;
          title_es: string;
          title_en: string;
          body_es: string;
          body_en: string;
          published: boolean;
          updated_at: string;
        };
        Insert: {
          section_key: string;
          title_es?: string;
          title_en?: string;
          body_es?: string;
          body_en?: string;
          published?: boolean;
          updated_at?: string;
        };
        Update: {
          section_key?: string;
          title_es?: string;
          title_en?: string;
          body_es?: string;
          body_en?: string;
          published?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      lena_schedule_sessions: {
        Row: {
          id: number;
          club: string;
          day_es: string;
          day_en: string;
          time: string;
          location: string;
          level: string;
          sort_order: number;
        };
        Insert: {
          id?: number;
          club: string;
          day_es?: string;
          day_en?: string;
          time?: string;
          location?: string;
          level?: string;
          sort_order?: number;
        };
        Update: {
          id?: number;
          club?: string;
          day_es?: string;
          day_en?: string;
          time?: string;
          location?: string;
          level?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      lena_testimonials: {
        Row: {
          id: number;
          name: string;
          flag: string;
          country_es: string;
          country_en: string;
          text_es: string;
          text_en: string;
          sort_order: number;
        };
        Insert: {
          id?: number;
          name: string;
          flag?: string;
          country_es?: string;
          country_en?: string;
          text_es?: string;
          text_en?: string;
          sort_order?: number;
        };
        Update: {
          id?: number;
          name?: string;
          flag?: string;
          country_es?: string;
          country_en?: string;
          text_es?: string;
          text_en?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
      lena_words: {
        Row: {
          id: number;
          cyrillic: string;
          phonetic: string;
          translation_es: string;
          translation_en: string;
          emoji: string;
          sort_order: number;
        };
        Insert: {
          id?: number;
          cyrillic: string;
          phonetic?: string;
          translation_es?: string;
          translation_en?: string;
          emoji?: string;
          sort_order?: number;
        };
        Update: {
          id?: number;
          cyrillic?: string;
          phonetic?: string;
          translation_es?: string;
          translation_en?: string;
          emoji?: string;
          sort_order?: number;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
