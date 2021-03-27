import React, { useState, useEffect } from 'react';
import './Ballot.css';
import Api from '../../Api/Api';
import usePersState from '../../Hooks/usePersState';
import Categories from '../Categories/Categories';
import Modal from '../UI/Modal/Modal';
import SlidePanel from '../UI/SlidePanel/SlidePanel';

const Ballot = () => {
  const defaultCat = []
  const defaultSubmissions = ({showPanel:false, currentResults:[]})
  const [curCategories, setCategories] = usePersState('curCategories', defaultCat);
  const [isReady, setIsReady] = useState({ready:false, ballotResults:''});
  const [curSubmissions, setSubmissions] = usePersState('curSubmissions', defaultSubmissions);

  useEffect(() => {
    if (curCategories.length === 0) {
      apiHandler();
    }
  }, [curCategories.length, setCategories]);

  useEffect(() => {
      if (isReady.ballotResults.length !== 0 ) {
        setSubmissions(curSubmissions => { return {...curSubmissions, currentResults: [...curSubmissions.currentResults, isReady.ballotResults]}})
      }
  }, [setSubmissions, isReady.ballotResults]);
  
  const apiHandler = () => {
      Api.getBallotData()
      .then(responseData => {
        let catagories = responseData.items;
        const loadedCategories = [];
        for (const key in catagories) {
          loadedCategories.push({
            id: catagories[key].id,
            title: catagories[key].title,
            catitems: catagories[key].items,
            isSelected:false,
          });
        }
        setCategories(loadedCategories);
      });
  };
    
  const userSelectHandler = (catId, itemId) => {
      let cats = [...curCategories];
      let cat = cats.find(x => x.id === catId)
      let select = cat.catitems.find(x => x.isSelected === true)
      if (!cat.isSelected) {
        cat.isSelected = true;
        cat.catitems.find(x => x.id === itemId).isSelected = true;
        setCategories(curCategories =>
          cats
        );
      } else if (select) {
        select.isSelected = '';
        cat.catitems.find(x => x.id === itemId).isSelected = true;
        setCategories(curCategories =>
          cats
        );
      }
  };
  
  const validateBallot = () => {
      let ready = false;
      for (const key in curCategories) {
        if (curCategories[key].isSelected) {
          setIsReady(isReady => ({
              ...isReady,
              ready: true
          }));
          ready = true;
        } else {
          setIsReady(isReady => ({
              ...isReady,
              ready: false
          }));
          ready = false;  
        }
      }
      return ready;
  }
  const submitBallotHandler = async () => {
      let ready = await validateBallot();
      let catChoice = curCategories.filter(x => x.isSelected === true)
      let ballotChoice = catChoice.map(cat => ({
        id:cat.id,
        cat:cat.title,
        catitem:cat.catitems.filter(x => x.isSelected === true)
      }));
      if (ready) {
        console.log('Ready', ready);
        setIsReady(isReady => ({...isReady, ballotResults: ballotChoice}))
        apiHandler();
      }
  };

  const seeResultsHandler = () => {
      setSubmissions(curSubmissions => ({...curSubmissions, showPanel: true}))
  };

  return (
    <div className='ballot'>
       {isReady.ready && <Modal 
          onClose={() => setIsReady(isReady => ({...isReady, ready: false}))}
          details={isReady.ballotResults}>
       </Modal>
      }  
      <h1>AWARDS 2021</h1>
      <Categories
        categories={curCategories}
        onSelectItem={userSelectHandler}
      />
      {curSubmissions.showPanel && <SlidePanel 
          onClose={() => setSubmissions(curSubmissions => ({...curSubmissions, showPanel: false}))}
          details={curSubmissions.currentResults}>
       </SlidePanel>}
      <button className="results-button" onClick={seeResultsHandler}>See Current Results</button>
       <button onClick={submitBallotHandler}>Submit Ballot</button> 
    </div>
  );

}

export default Ballot;
