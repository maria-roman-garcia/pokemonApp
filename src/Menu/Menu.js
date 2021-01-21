import React, { useContext, useState, useEffect } from 'react';
import Context from '../Context/Context';
//reactstrap
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const Menu = () => {

    // context
    const contextComponent = useContext(Context);
    const contextComponentValue = contextComponent.contextInfo;
    const setContextComponentValue = contextComponent.setContextInfo;

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    //Calculate the screen width
    useEffect(() => {
        const updateWindowDimensions = () => {
            setScreenWidth(window.innerWidth);
        };
        window.addEventListener("resize", updateWindowDimensions);
        return () => window.removeEventListener("resize", updateWindowDimensions);
    }, []);

    const totalPagination = Math.ceil(contextComponentValue.count / 20);

    const paginationNum = () => {
        const paginationSelected = contextComponentValue.paginationSelected;
        const withEachCell = 45;
        let arrowsSize = withEachCell * 4;
        let widthScreen = screenWidth;
        if (screenWidth > 1402) {
            widthScreen = 1402;
        }
        let numberPaginationOptions = Math.floor((widthScreen - arrowsSize) / withEachCell);
        let minVal = 0;
        let maxVal = 0;
        if (numberPaginationOptions > totalPagination) {
            numberPaginationOptions = totalPagination;
        }
        if (paginationSelected - Math.floor(numberPaginationOptions / 2) < 1) {
            minVal = 1;
            maxVal = numberPaginationOptions;
        } else if (paginationSelected + Math.floor(numberPaginationOptions / 2) > totalPagination) {
            minVal = totalPagination - numberPaginationOptions;
            maxVal = totalPagination;
        } else {
            minVal = paginationSelected - Math.floor(numberPaginationOptions / 2)
            maxVal = paginationSelected + Math.floor(numberPaginationOptions / 2)
        }
        let toReturn = [];
        for (let i = minVal; i <= maxVal; i++) {
            toReturn.push(
                <PaginationItem className={paginationSelected === i ? "active" : undefined} onClick={() => setContextComponentValue({ ...contextComponentValue, paginationSelected: i })} key={"paginationItem_" + i}>
                    <PaginationLink href="#">
                        {i}
                    </PaginationLink>
                </PaginationItem>
            )
        }
        return toReturn;
    }

    return (
        <div className="Menu">
            <div className="row justifyCenter">
                <Pagination aria-label="Page navigation example" style={{ display: "flex", justifyContent: "center" }}>
                    <PaginationItem disabled={contextComponentValue.paginationSelected === 1}>
                        <PaginationLink first onClick={() => setContextComponentValue({ ...contextComponentValue, paginationSelected: 1 })} />
                    </PaginationItem>
                    <PaginationItem disabled={contextComponentValue.paginationSelected === 1}>
                        <PaginationLink previous onClick={() => setContextComponentValue({ ...contextComponentValue, paginationSelected: contextComponentValue.paginationSelected - 1 })} />
                    </PaginationItem>
                    {paginationNum()}
                    <PaginationItem disabled={contextComponentValue.paginationSelected === totalPagination}>
                        <PaginationLink next onClick={() => setContextComponentValue({ ...contextComponentValue, paginationSelected: contextComponentValue.paginationSelected + 1 })} />
                    </PaginationItem>
                    <PaginationItem disabled={contextComponentValue.paginationSelected === totalPagination}>
                        <PaginationLink last onClick={() => setContextComponentValue({ ...contextComponentValue, paginationSelected: totalPagination })} />
                    </PaginationItem>
                </Pagination>
            </div>
        </div>
    )
}

export default Menu;