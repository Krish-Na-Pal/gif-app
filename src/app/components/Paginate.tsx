"use client"; // This is a client component 👈🏽

interface Props {
    pageSelected: (pageNumber: number) => void;
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
  }

const Paginate: React.FC<Props> = ({ pageSelected,currentPage, itemsPerPage, totalItems }) => {
    const pageNumbers = [];

    for(let i = 1;i <= Math.ceil(totalItems/itemsPerPage); i++){
        pageNumbers.push(i);
    }

  return <nav className=" bottom-5 sticky">
    <ul className="flex text-black gap-2">
        <li>
            <div className="flex pr-2 pl-2 bg-slate-200 h-12 w-auto text-center items-center align-middle font-mono font-bold">
                    <a 
                        onClick={() => {
                            if(currentPage > 1){
                            pageSelected(currentPage - 1)
                            }
                        }}
                        href="#" 
                        className="page-link"
                    >
                        Previous
                    </a>
            </div>
        </li>
        {pageNumbers.map(number => {

            let classes = "flex bg-slate-200 h-12 w-10 items-center justify-center font-mono font-bold";
            if( number === currentPage){
                classes = "flex border-b-4 border-pink-500 h-12 w-10 bg-pink-200 items-center justify-center font-mono font-bold";
            }

            return(
                <li key={number}>
                    <a 
                        onClick={() => {pageSelected(number)}}
                        href="#" 
                        className="page-link"
                    >
                        <div className={classes}>
                            {number}
                        </div>
                    </a>    
                </li>
            )}
        )}
        <li>
            <div className="flex pr-2 px-2 bg-slate-200 h-12 w-auto text-center items-center align-middle font-mono font-bold ">
                    <a 
                        onClick={() => {
                            if(pageNumbers.length > currentPage){
                                pageSelected(currentPage + 1)
                            }
                        }}
                        href="#" 
                        className="page-link"
                    >
                        Next
                    </a>
            </div>
        </li>
    </ul>
  </nav>
};

export default Paginate;
