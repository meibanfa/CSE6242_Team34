
las_business_ids <- jsonlite::read_json(("data/Las Vegas.json"))
las_business_ids <- sapply(las_business_ids, function(x) x$business_id)

page_handler <- local({
    ldf <- list()
    function(x) {
        if (missing(x)) {
            return(ldf)
        }
        x <- x[x$business_id %in% las_business_ids, ]
        ldf <<- append(ldf, list(x))
        ldf
    }
})
jsonlite::stream_in(
    file("yelp_dataset/yelp_academic_dataset_review.json"),
    handler = page_handler,
    pagesize = 50000
)

reviews <- do.call(rbind, page_handler())

library(tibble)
reviews <- as_tibble(reviews)
library(dplyr)
reviews <- dplyr::arrange(reviews, business_id, user_id)
reviews

jsonlite::write_json(reviews, "data/Las Vegas_reviews.json")
