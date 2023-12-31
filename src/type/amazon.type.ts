// Generated by https://quicktype.io

export interface AmazonJobs {
  error:   null;
  hits:    number;
  facets:  AmazonFacets;
  content: AmazonContent;
  jobs:    AmazonJob[];
}

export interface AmazonContent {
  sidebar:        AmazonSearchResults;
  search_results: AmazonSearchResults;
}

export interface AmazonSearchResults {
}

export interface AmazonFacets {
  is_intern:             { [key: string]: number }[];
  job_function_id_facet: AmazonJobFunctionIDFacet[];
  is_manager:            { [key: string]: number }[];
  category_facet:        AmazonCategoryFacet[];
}

export interface AmazonCategoryFacet {
  "Software Development": number;
}

export interface AmazonJobFunctionIDFacet {
  job_function_corporate_80rdb4: number;
}

export interface AmazonJob {
  basic_qualifications:     string;
  business_category:        string;
  city:                     string;
  company_name:             string;
  country_code:             string;
  description:              string;
  department_cost_center:   null;
  description_short:        string;
  display_distance:         null;
  id:                       string;
  id_icims:                 string;
  is_intern:                null;
  is_manager:               null;
  job_category:             string;
  job_family:               string;
  job_function_id:          null;
  job_path:                 string;
  job_schedule_type:        string;
  location:                 Location;
  locations:                string[];
  normalized_location:      string;
  optional_search_labels:   string[];
  posted_date:              string;
  preferred_qualifications: string;
  primary_search_label:     string;
  source_system:            string;
  state:                    string | null;
  title:                    string;
  university_job:           null;
  updated_time:             string;
  url_next_step:            string;
  team:                     { [key: string]: string | null };
}