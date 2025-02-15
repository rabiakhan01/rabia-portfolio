import React, { useContext } from "react";
import { bookListingContext } from "../ContextProvider";
import { allBooksData } from "../../../utils/MockupData";
import images from "../../../assets/images/images";

const FilteredChip = ({ name }) => {

    const context = useContext(bookListingContext);
    console.log("🚀 ~ filters ~ filters:", context.bookPageContext.bookFilters);

    const removeFilter = (removeItem) => {
        console.log("clear", context.bookPageContext.bookFilters)
        const filterData = [];
        if (context.bookPageContext.bookFilters.length > 0) {
            if (name === 'Price') {
                const updatedFilter = context.bookPageContext.bookFilters.filter((item) => !item.minPrice || !item.maxPrice);
                context.setBookPageContext({ ...context.bookPageContext, bookFilters: updatedFilter, bookListing: allBooksData });
            }
            else {
                const updatedFilter = context.bookPageContext.bookFilters.filter((item) => item.name !== removeItem)
                const filters = { ...context.bookPageContext, bookFilters: updatedFilter };
                filters.bookFilters.map(element => {
                    allBooksData.filter((filterItem) => {
                        if (filterItem.category == element.name || filterItem.language == element.name) {
                            filterData.push(filterItem);
                        }
                    })
                });
                context.setBookPageContext({ ...context.bookPageContext, bookFilters: updatedFilter, bookListing: filterData });
            }
        }
        if (context.bookPageContext.bookFilters.length === 1) {
            context.setBookPageContext({ ...context.bookPageContext, bookFilters: [], bookListing: allBooksData });
        }
    }

    return (
        <div className="flex justify-center items-center gap-2 bg-chipColor w-auto p-2 rounded-full mb-3 lg:mb-0">
            <p className="text-sm text-textLightWhiteColor text-nowrap">{name}</p>
            <button className="flex justify-center items-center h-6 w-6 sm:h-8 sm:w-8 bg-secondaryColor rounded-full" ><img src={images.cross} className="w-3 h-3" onClick={() => removeFilter(name)} /></button>
        </div>
    )

}

export default FilteredChip;