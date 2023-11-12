// Generated by https://quicktype.io

export interface GoogleJobs {
  count:     number;
  next_page: number;
  page_size: number;
  jobs:      GoogleJob[];
}

export interface GoogleJob {
  additional_instructions: null;
  application_instruction: string;
  apply_url:               string;
  building_pins:           string
  categories:              string
  company_id:              string
  company_name:            string
  created:                 string;
  description:             string;
  education_levels:        string
  has_remote:              boolean;
  id:                      string;
  language_code:           string
  locations:               GoogleLocation[];
  locations_count:         number;
  modified:                string;
  publish_date:            string;
  qualifications:          string;
  responsibilities:        string;
  summary:                 string;
  target_level:            string
  title:                   string;
}

export interface GoogleLocation {
  display:       string
  lat:           number;
  lon:           number;
  address_lines: string[];
  city:          string
  post_code:     string
  country:       string
  country_code:  string
  is_remote:     boolean;
}
