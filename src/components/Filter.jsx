const Filter = ({ filter, handleFilter }) => {
    return (
        <div className="flex items-center gap-2">
            <select
                value={filter}
                onChange={handleFilter}
                className="select select-bordered select-sm w-30 outline-none"
            >
                <option value="all">All</option>
                <option value="returnable">Returnable</option>
                <option value="non-returnable">Non-Returnable</option>
            </select>
        </div>
    );
};

export default Filter;
