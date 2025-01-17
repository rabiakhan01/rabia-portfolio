import React from "react";
import BooksListing from "../../components/AllBooksPage/BooksListing";
import { Headline, SearchBar } from "../../components/Shared";

const AllBooksPage = () => {
    return (

        <div className="mb-4">
            <div className="sticky top-[3.6rem] sm:top-[4.5rem] lg:top-20 z-20 pt-7 bg-primaryColor pb-3 sm:pb-4">
                <SearchBar
                    name="books"
                />
            </div>

            <div className="mb-4">
                <Headline
                    headlineData="all books"
                />
            </div>
            <BooksListing />
        </div>

    )
}

export default AllBooksPage;