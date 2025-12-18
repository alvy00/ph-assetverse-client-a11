const CompanyTabs = ({ comTabs, checkedComs, setCheckedComs }) => {
    const handleChecked = (e) => {
        if (e.target.checked) {
            setCheckedComs([...checkedComs, e.target.value]);
        } else {
            setCheckedComs(checkedComs.filter((com) => com !== e.target.value));
        }
    };

    const handleReset = () => {
        setCheckedComs([]);
    };
    return (
        <form className="flex gap-2" onReset={handleReset}>
            {comTabs.map((company) => (
                <input
                    className="btn uppercase"
                    type="checkbox"
                    name="frameworks"
                    value={company}
                    aria-label={company}
                    onChange={handleChecked}
                    checked={checkedComs.includes(company)}
                />
            ))}
            <input className="btn btn-square" type="reset" value="×" />
        </form>
    );
};

export default CompanyTabs;
