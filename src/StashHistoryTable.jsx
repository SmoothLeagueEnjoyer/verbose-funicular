import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import "./StashHistoryTable.css";

export function StashHistoryTable() {

    const stashActions = useSelector((state) => state.filter.stashActions);
    const leagues = useSelector((state) => state.filter.leagues);
    const accounts = useSelector((state) => state.filter.accounts);
    const stashes = useSelector((state) => state.filter.stashes);

    const stashData = useSelector((state) => state.ghHistory.stashData);
    const peoples = useSelector((state) => state.ghHistory.people);
   // const sortedPeople = peoples.sort((a, b) => (a.removals - b.removals));//((b.removals - b.additions) - (a.removals - a.additions)));
    const peopleToDisplay = [...peoples].sort((a, b) => ((a.removals - a.additions) - (b.removals - b.additions)));

    const [currentFilters, setCurrentFilters] = useState({league: "Any", account: "Any", action: "Any", stash: "Any"})


    function getTableRow(entry) {
        //console.log(line);
        return <tr>
            <td>{entry.datetime}</td>
            <td>{entry.id}</td>
            <td>{entry.league}</td>
            <td>{entry.account}</td>
            <td>{entry.action}</td>
            <td>{entry.stash}</td>
            <td>{entry.item}</td>
        </tr>;
    }

    function getMySelection(a) {
        return <option value={a}>{a}</option>;
    }


    function actionSelect(e) {
        setCurrentFilters({...currentFilters, [e.target.name]: e.target.value});
    }

    function passesFilter(entry) {
        if (currentFilters.league !== "Any" && entry.league !== currentFilters.league)
            return false;
        if (currentFilters.account !== "Any" && entry.account !== currentFilters.account)
            return false;
        if (currentFilters.action !== "Any" && entry.action !== currentFilters.action)
            return false;
        if (currentFilters.stash !== "Any" && entry.stash !== currentFilters.stash)
            return false;
        return true;
    }

    return <>
        <div className="tables">
            <div className="History">
                <h3>Guild Stash History</h3>

                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Id</th>
                        <th>League</th>
                        <th>Account</th>
                        <th>Action</th>
                        <th>Stash</th>
                        <th>Item</th>
                    </tr>
                    </thead>
                    <thead>
                    <tr>
                        <td>No filter</td>
                        <td>No filter</td>
                        <td>
                            <form><select name="league" onChange={(e) => actionSelect(e)}>
                                <option value="Any">Any</option>
                                {
                                    leagues.map((a) => (getMySelection(a)))
                                }
                            </select>
                            </form>
                        </td>
                        <td>
                            <form><select name="account" onChange={(e) => actionSelect(e)}>
                                <option value="Any">Any</option>
                                {
                                    accounts.map((a) => (getMySelection(a)))
                                }
                            </select>
                            </form>
                        </td>
                        <td>
                            <form><select name="action" onChange={(e) => actionSelect(e)}>
                                <option value="Any">Any</option>
                                {
                                    //console.log(currentFilters)
                                }
                                {
                                    stashActions.map((a) => (getMySelection(a)))
                                }
                                {
                                    //console.log(currentFilters)
                                }

                            </select>
                            </form>
                        </td>
                        <td>
                            <form><select name="stash" onChange={(e) => actionSelect(e)}>
                                <option value="Any">Any</option>
                                {
                                    stashes.map((a) => (getMySelection(a)))
                                }
                            </select>
                            </form>
                        </td>
                        <td>No filter</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        stashData.filter((item) => passesFilter(item)).map((line) =>
                            //  (line + " " + lineIndex)
                            getTableRow(line)
                        )
                    }
                    </tbody>
                </table>

            </div>
            <div className="people">
                <h3>People</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Removals</th>
                            <th>Additions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        peopleToDisplay.map((person) => (
                            <tr>
                                <td>{person.name}</td>
                                <td>{person.removals}</td>
                                <td>{person.additions}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    </>
}