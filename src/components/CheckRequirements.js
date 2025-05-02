import { useContext, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from 'react-bootstrap/AccordionContext';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';

const UMBC_BLACK = 'rgb(0, 0, 0)';
const UMBC_GOLD = 'rgb(253, 181, 21)';

function ContextAwareToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey),
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <button
      type="button"
      className="text-umbcBlack font-semibold rounded-lg shadow-md hover:text-umbcGold"
      style={{ height:'65px', width: '125px', backgroundColor: isCurrentEventKey ? UMBC_BLACK : UMBC_GOLD, color: isCurrentEventKey ? UMBC_GOLD : UMBC_BLACK }}
      onClick={decoratedOnClick}
    >
      {children}
    </button>
  );
}

function CheckRequirements({showCheck}) {

  const [missingCourses, setMissingCourses] = useState([]); // Placeholder for missing courses logic
  
  
  return (
    <>
    {showCheck &&(
    <Accordion defaultActiveKey="0">
        <Card.Header>
          <ContextAwareToggle eventKey="1">Verify Major Requirements</ContextAwareToggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          
          <Card.Body>
            
            
          <div className="m-1 py-8 px-8 w-full space-y-2 border border-gray-300 bg-white rounded-xl shadow-md sm:py-2 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
            <div className="space-y-2 text-center sm:text-left w-full">
                <div className="space-y-0.35">
                    
                      
                  <div className="relative">
                  <p className="text-lg font-semibold text-black text-center ">Major Requirements</p>
                      
                  </div>
                    <div className="m-2 border border-gray-300 rounded-xl py-6 px-4 w-full space-y-2 bg-white rounded-xlsm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
                        
                        <div className="m-2 flex-1 space-y-2 text-center sm:text-left shadow-md bg-stone-100 h-full rounded-xl">
                        <div className="m-2 space-y-0.5">
                        <div className="relative">
                            <p className="text-lg font-semibold text-black">Status</p>

                        
                        </div>
                        </div>
                        </div>
                        {missingCourses.length > 0 && (
                          <div className="m-2 flex-1 space-y-2 text-center sm:text-left shadow-md bg-stone-100 h-full rounded-xl">
                          <div className="m-2 space-y-0.5">
                          <div className="relative">
                              <p className="text-lg font-semibold text-black">Missing Courses</p>

                          
                          </div>
                          </div>

                          </div>
                          )}
                        
                  </div>
                      
                    
                </div>
            </div>
        </div>
            
            
          </Card.Body>
        </Accordion.Collapse>
    </Accordion>
  )}
  </>                   
  );
}

export default CheckRequirements;
