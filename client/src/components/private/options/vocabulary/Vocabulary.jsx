import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Navbar from '../../../common/Navbar';
import { FaRegPlusSquare, FaTag, FaWindowClose, FaSortAlphaDown } from "react-icons/fa";
import './Vocabulary.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Vocabulary = () => {

    const [allWords, setAllWords] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [addButton, setAddButton] = useState(false);
    const searchBoxRef = useRef();
    const wordClickCount = useRef(0);
    const timer = useRef(null);
    const [allLabels, setAllLabels] = useState([]);
    const [wordSelected, setWordSelected] = useState(null);
    const [labelFilter, setLabelFilter] = useState(null);

    const history = useHistory();
    const [user, setUser] = useState(null);
    const NavbarContents = [{ name: 'logout', link: '/logout' }];

    // To determine whether the user is authorized(if yes then retrieve the user from database)
    useEffect(() => {
        // So that whenever this component renders, the input box is automatically focused
        searchBoxRef.current.focus();

        async function callVocabulary() {
            try {
                const res = await fetch('/vocabulary', {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                const data = await res.json();

                if (data && res.status === 201) {
                    setUser(data.user);
                }
                else {
                    history.push('/login');
                }
            } catch (error) {
                console.log('Vocabulary error: ' + error);
                history.push('/login');
            }
        }
        callVocabulary();
    }, [history]);

    // To set the list of all the words and labels(from database)
    useEffect(() => {
        // So that whenever this component renders, the input box is automatically focused
        searchBoxRef.current.focus();
        if (user) {
            const wordList = user.vocabulary;
            let wordObjects = [];
            for (let i = 1; i < wordList.length; i++) {
                wordObjects.push(wordList[i]);
            }
            setAllLabels(wordList[0]);   //The 0th index has all the labels
            setAllWords(wordObjects);
            if (wordSelected === null)
                setWordSelected(null);
            else {
                for (let i = 0; i < wordList.length; i++) {
                    if (wordList[i].word === wordSelected.word) {
                        setWordSelected(wordList[i]);
                        break;
                    }
                }
            }
        }
    }, [user, wordSelected]);

    // To maintain the searchresults
    useEffect(() => {
        // So that whenever this component renders, the input box is automatically focused
        searchBoxRef.current.focus();
        setSearchResults(allWords.filter((wordObj) => {
            let SQ = searchQuery.trim();
            return wordObj.word.includes(SQ);
        }))
    }, [allWords, searchQuery])

    // To determine whether to display the add new word button or not
    useEffect(() => {
        // So that whenever this component renders, the input box is automatically focused
        searchBoxRef.current.focus();
        let wordExistsAlready = false;
        for (let i = 0; i < searchResults.length; i++) {
            if (searchResults[i].word === searchQuery) {
                wordExistsAlready = true;
                break;
            }
        }

        if (wordExistsAlready || searchQuery.trim() === '' || searchQuery.trim().length === 1) {
            setAddButton(false);
        }
        else {
            setAddButton(true);
        }
    }, [searchResults, searchQuery])

    // To handle the searchQuery value
    function searchBarHandler(e) {
        const word = e.target.value.toUpperCase();
        setSearchQuery(word);
    }

    // Toast for error
    const ErrorToast = (errorMsg) => {
        toast.error(errorMsg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });
    }

    // Toast for success
    const SuccessToast = (succesMsg) => {
        toast.success(succesMsg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        });
    }

    // function to add new word
    async function addNewWord() {
        try {
            const res = await fetch('/vocabulary/addWord', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ newWord: searchQuery.trim(), username: user.username }),
            });

            const data = await res.json();

            if (data && res.status === 201) {
                setUser(data.user);
                SuccessToast(data.message);
                setSearchQuery('');
            }
            else {
                ErrorToast(data.error);
            }
        }
        catch (error) {
            console.log('AddWord error: ' + error);
        }
    }

    // UseEffect to filter by label
    useEffect(() => {
        let words = [];
        if (labelFilter === null) {
            words = allWords;
        }
        else {
            for (let i = 0; i < allWords.length; i++) {
                const labelsOfCurrWord = allWords[i].labels;
                let hasLabel = false;
                for (let i = 0; i < labelsOfCurrWord.length; i++) {
                    if (labelsOfCurrWord[i] === labelFilter) {
                        hasLabel = true;
                        break;
                    }
                }
                if (hasLabel)
                    words.push(allWords[i]);
            }
            setSearchResults(words);
        }
        setSearchResults(words);
    }, [labelFilter, allWords]);

    // Function to set the label filter
    function filterByLabel(selectedLabel) {
        if (labelFilter === selectedLabel) {
            setLabelFilter(null);
        }
        else {
            setLabelFilter(selectedLabel);
        }
    }

    // Function to handle clicks on a word
    function selectWord(wordObj) {

        wordClickCount.current++;  //count clicks
        const DELAY = 500;

        if (wordClickCount.current === 1) {
            timer.current = setTimeout(function () {
                if (wordObj !== wordSelected) {
                    setWordSelected(wordObj);
                }
                else {
                    setWordSelected(null);
                }

                wordClickCount.current = 0;             //after action performed, reset counter
            }, DELAY);
        }
        else {
            clearTimeout(timer.current);
            searchWordMeaning(wordObj.word);
            wordClickCount.current = 0;             //after action performed, reset counter
        }
    }

    // Function to add a new label to an existing word
    async function addNewLabelToWord(newLabel, wordObj) {
        try {
            const res = await fetch('/vocabulary/addNewLabelToWord', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ word: wordObj.word, newLabel, username: user.username }),
            });

            const data = await res.json();

            if (data && res.status === 201) {
                setUser(data.user);
            }
            else {
                ErrorToast(data.error);
            }
        }
        catch (error) {
            console.log('AddNewLabelToWord error: ' + error);
        }
    }

    // Function to remove a label from an existing word
    async function removeLabelFromWord(removeLabel, wordObj) {
        try {
            const res = await fetch('/vocabulary/removeLabelFromWord', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ word: wordObj.word, removeLabel, username: user.username }),
            });

            const data = await res.json();

            if (data && res.status === 201) {
                setUser(data.user);
            }
            else {
                ErrorToast(data.error);
            }
        }
        catch (error) {
            console.log('RemoveLabelFromWord error: ' + error);
        }
    }

    // Function to close the word's label(basically, unselect the word)
    function closeLabels() {
        setWordSelected(null);
    }

    // function to delete a word
    async function deleteWord() {
        if (window.confirm(`Do you want to delete '${wordSelected.word}' ?`)) {
            try {
                const res = await fetch('/vocabulary/deleteWord', {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ word: wordSelected.word, username: user.username }),
                });

                const data = await res.json();

                if (data && res.status === 201) {
                    setUser(data.user);
                    SuccessToast(data.message);
                    setWordSelected(null);
                }
                else {
                    ErrorToast(data.error);
                }
            }
            catch (error) {
                console.log('DeleteWord error: ' + error);
            }
        }
    }

    // Function to search the meaning of a word in new tab
    function searchWordMeaning(word) {
        word = word.toLowerCase();
        let googleSearchQuery = `https://www.google.com/search?q=${word}+meaning&rlz=1C1CHBF_enIN852IN852&oq=alloy+meaning&aqs=chrome..69i57.2439j0j1&sourceid=chrome&ie=UTF-8`;
        window.open(googleSearchQuery, "_blank");
    }

    return (
        <>
            <ToastContainer style={{ fontSize: "2rem" }} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} limit={3} theme={"dark"} pauseOnFocusLoss={false} draggable pauseOnHover={false} />
            <section className="vocabulary">
                <div className="container">
                    <Navbar contents={NavbarContents} />
                    <div className="main-content">
                        <div className="search-bar-container">
                            <input ref={searchBoxRef} id="new-word" maxLength="15" type="text" placeholder="Enter word" value={searchQuery} onChange={(e) => searchBarHandler(e)} />
                            {addButton && <FaRegPlusSquare className="icons" onClick={addNewWord} />}
                        </div>
                        <div className="labels-container">
                            {
                                wordSelected === null ?
                                    <>{
                                        user !== null ? <>
                                            <span>Tags</span>
                                            {
                                                allLabels.length > 0 ?
                                                    <ul>
                                                        {
                                                            allLabels.map((currLabel, index) => {
                                                                if (currLabel === labelFilter) {
                                                                    return <li key={index} className="all-labels" style={{ backgroundColor: "lightgreen" }} onClick={() => filterByLabel(currLabel)}>{currLabel}</li>
                                                                }
                                                                else {
                                                                    return <li key={index} className="all-labels unselected-labels" onClick={() => filterByLabel(currLabel)}>{currLabel}</li>
                                                                }
                                                            })
                                                        }
                                                    </ul> : <span>No available tags</span>
                                            }
                                        </>
                                            : <h2>Loading...</h2>     //This will be displayed when the data is being fetched from the database
                                    }
                                    </>
                                    :
                                    <>
                                        <FaWindowClose id="close-icon" onClick={closeLabels} />
                                        <h2 id="word-label-heading">{wordSelected.word}</h2>
                                        <ul>
                                            {
                                                allLabels.map((currLabel, index) => {
                                                    let labelFound = false;
                                                    let wordLabels = wordSelected.labels;
                                                    for (let i = 0; i < wordLabels.length; i++) {
                                                        if (currLabel === wordLabels[i]) {
                                                            labelFound = true;
                                                            break;
                                                        }
                                                    }
                                                    if (labelFound)
                                                        return <li key={index} className="added-labels" onClick={() => removeLabelFromWord(currLabel, wordSelected)}>{currLabel}</li>
                                                    else
                                                        return <li key={index} className="addable-labels" onClick={() => addNewLabelToWord(currLabel, wordSelected)}>{currLabel}</li>
                                                })
                                            }
                                        </ul>
                                        <button id="delete-word-btn" onClick={deleteWord}>Delete word</button>
                                    </>
                            }
                        </div>
                        {
                            user && <div className="words-container">
                                <div className="top-container">
                                    <div className="tools">
                                        {/* <FaSortAlphaDown className='icons' onClick={sortResult}/> */}
                                    </div>
                                    <h2>Results</h2>
                                </div>
                                <ul>
                                    {
                                        searchResults.map((wordObj, index) => {
                                            const word = wordObj.word;
                                            return <li key={index}>{index + 1}. <span onClick={() => {selectWord(wordObj)}} onDoubleClick={(e) => e.preventDefault()}>{word}</span><FaTag className="label-icons" onClick={() => { selectWord(wordObj) }} /></li>
                                        })
                                    }
                                </ul>
                            </div>
                        }

                    </div>
                </div>
            </section>
        </>
    );
}

export default Vocabulary;