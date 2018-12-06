
library(here)
data <- jsonlite::stream_in(file(here("yelp_dataset/yelp_academic_dataset_business.json")))
data <- data[, c("business_id", "categories")]
data <- tibble::as_tibble(data)
data$categories <- strsplit(data$categories, ", ", fixed = TRUE)
data

library(dplyr)
## Flat the data
data <- tibble::tibble(
    business_id = rep(data$business_id, lengths(data$categories)),
    category = unlist(data$categories)
)
data

## Category count
data <- data %>%
    group_by(category) %>%
    summarize(count = length(unique(business_id))) %>%
    arrange(desc(count))
data

jsonlite::write_json(data, here("data/category_count.json"))
