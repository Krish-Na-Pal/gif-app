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

  return <nav>
    <ul className="flex text-black gap-2">
        <li>
            <div className="flex pr-2 pl-2 bg-slate-300 h-10 w-auto text-center items-center align-middle font-mono font-bold">
                Previous
            </div>
        </li>
        {pageNumbers.map(number => {
            return(
                <li key={number}>
                    <a 
                        onClick={() => {pageSelected(number)}}
                        href="#" 
                        className="page-link"
                    >
                        <div className="flex bg-slate-300 h-10 w-10 items-center justify-center font-mono font-bold">
                            {number}
                        </div>
                    </a>    
                </li>
            )}
        )}
        <li>
            <div className="flex pr-2 px-2 bg-slate-300 h-10 w-auto text-center items-center align-middle font-mono font-bold">
                Next
            </div>
        </li>
    </ul>
  </nav>
};

export default Paginate;
