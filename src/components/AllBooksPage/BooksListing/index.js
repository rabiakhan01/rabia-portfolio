import React, { useContext, useEffect, useState } from "react";
import { FilteredChip, Pagination, ProductCard } from "../../Shared";
import FilterSection from "../../Shared/FilterSection";
import { bookListingContext } from "../../Shared/ContextProvider";
import { useNavigate } from "react-router-dom";
import { allBooksData } from "../../../utils/MockupData";
import images from "../../../assets/images/images";

const BooksListing = () => {

    const navigate = useNavigate();
    const context = useContext(bookListingContext);

    //console.log("homepage", context.bookPageContext.bookListing)

    const [showFilterSection, setShowFilterSection] = useState(false);

    const handelFilters = () => {
        setShowFilterSection(!showFilterSection)
    }

    const resetAllFilters = () => {
        context.setBookPageContext({ ...context.bookPageContext, bookFilters: [] })
    }

    const navigateToDetailPage = (bookId) => {
        navigate(`book-detail/${bookId}`);
    }

    // when window is resized then remove the opened filter drawer
    window.addEventListener('resize', function (event) {
        if (window.innerWidth > 1024) {
            setShowFilterSection(false);
            event.preventDefault();
        }
    });

    useEffect(() => {
        setShowFilterSection(false);
    }, [context.bookPageContext.bookFilters])

    const clearFilters = () => {
        context.setBookPageContext({ ...context.bookPageContext, bookFilters: [], bookListing: allBooksData })
    }

    return (

        <div className="flex flex-col bg-secondaryColor p-4" id="pageStart">
            <div className="flex flex-col lg:flex-row w-full gap-4 pb-1 lg:pb-4  ">
                <div className="flex justify-between w-full lg:w-[32.5%] ">

                    <div className="flex justify-center items-center gap-2" >
                        <img src={images.filterIcon} alt="" className="lg:hidden h-5 w-5 small-tab:h-6 small-tab:w-6 cursor-pointer" onClick={handelFilters} />
                        <p className="text-textSecondaryColor text-xl md:text-2xl uppercase">Filters</p>
                        <p className={`text-grayColor text-xl ${context.bookPageContext.bookFilters.length > 0 ? 'flex' : 'hidden'}`}>({context.bookPageContext.bookFilters.length})</p>
                    </div>
                    <div className={`${context.bookPageContext.bookFilters.length > 0 ? 'flex' : 'hidden'}`}>
                        <button className="flex justify-center items-center p-2 sm:p-3 w-20 sm:w-24 bg-black rounded-full text-textLightWhiteColor text-sm" onClick={resetAllFilters} disabled={showFilterSection}>Reset all</button>
                    </div>
                </div>
                <div className={`${context.bookPageContext.bookFilters.length > 0 ? 'flex' : 'hidden'} gap-2 w-full overflow-auto`}>
                    {
                        context.bookPageContext.bookFilters.map((item, index) => {
                            if (item.name) {
                                return (
                                    <FilteredChip
                                        key={index}
                                        name={item.name}
                                    />
                                )
                            }
                            if (item.minPrice || item.maxPrice) {
                                return (
                                    <FilteredChip
                                        key={index}
                                        name="Price"
                                    />
                                )
                            }
                        })

                    }
                </div>
            </div>
            <div className="relative flex gap-2 w-full pb-4">

                <div className={` ${showFilterSection ? 'absolute top-2 flex z-10  pr-2' : 'hidden lg:flex'} ${context.bookPageContext.bookFilters.length > 0 ? '-top-16 sm:-top-[70px]' : ''} flex-col w-full small-tab:w-80 lg:w-[32.5%] rounded-xl h-[30.1rem] bg-primaryColor `}>
                    <FilterSection />
                </div>
                {
                    context.bookPageContext.bookListing.length > 0
                        ?
                        <div className={` ${showFilterSection ? 'brightness-50' : ''} w-full flex flex-col pt-2 lg:pt-0`}>
                            <div className={`flex pr-2 pl-1 flex-wrap w-full h-lvh ${showFilterSection ? 'overflow-hidden' : 'overflow-auto'} gap-2`} id="cards">
                                {
                                    context.bookPageContext.bookListing.map((book, index) => {
                                        return (
                                            <ProductCard
                                                key={index}
                                                id={book.id}
                                                image={book.book_img}
                                                name={book.book_name}
                                                intro={book.author_name}
                                                review={book.rating.reviews}
                                                rate={book.rating.star}
                                                views={book.rating.views}
                                                old_price={book.old_price}
                                                new_price={book.new_price}
                                                disabled={showFilterSection ? true : false}
                                                onClick={() => navigateToDetailPage(book.id)}
                                            />
                                        )
                                    })
                                }
                            </div>
                            <Pagination
                                maxRecordsPerPage={6}
                                name="books"
                            />
                        </div>
                        :

                        <div className="flex flex-col w-full justify-center items-center text-textLightWhiteColor">
                            <p className="text-xl font-medium">Sorry, we couldn't find any results for those filters.</p>
                            <div className="flex gap-1">
                                <p>Try removing a filter or changing of your search query.</p>
                                <button className="text-errorBgColor uppercase text-sm" onClick={clearFilters}>clear filters</button>
                            </div>
                        </div>
                }
            </div >
        </div >

    )
}

export default BooksListing;