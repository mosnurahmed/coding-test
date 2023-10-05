import  { useState, useEffect } from "react";

const Problem2 = () => {
  const [showModal, setShowModal] = useState(null);
  const [onlyEven, setOnlyEven] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allContacts, setAllContacts] = useState([]);


  useEffect(() => {
    fetch("https://contact.mediusware.com/api/contacts/")
      .then((response) => response.json())
      .then((data) => {
        return setAllContacts(data.results);
      });
  }, []);
 

  const handleOpenModal = (modal) => {
    setShowModal(modal);
  };

  const handleCloseModal = () => {
    setShowModal(null);
  };

  const handleToggleOnlyEven = () => {
    setOnlyEven(!onlyEven);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const getFilteredContacts = (contacts, a) => {
    if (showModal === "A") {
      return contacts.filter((contact) => {
        if (onlyEven && contact.id % 2 !== 0) {
          return false;
        }

        return true;
      });
    } else {
      return contacts.filter((contact) => {
        if (contact.country.name === "United States") {
          return contacts.filter((contact) => {
            if (onlyEven && contact.id % 2 !== 0) {
              return false;
            }
        
            return true;
          });
        }
      });
    }
  };
  const searchHandler=(searchQuery)=>{
   if(searchQuery){
    return allContacts.country.name.includes(searchQuery)
   }
   return true
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-lg btn-outline-primary" type="button" onClick={() => handleOpenModal("A")}>
            All Contacts
          </button>
          <button className="btn btn-lg btn-outline-warning" type="button" onClick={() => handleOpenModal("B")}>
            US Contacts
          </button>
        </div>
      </div>

      {showModal && (
        <div>
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h3>{showModal === "A" ? "All Contacts" : "US Contacts"}</h3>
            <label>
              <input type="checkbox" checked={onlyEven} onChange={handleToggleOnlyEven} />
              Only Even
            </label>
            <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchInputChange} />
            <ul>
              {getFilteredContacts(allContacts, showModal).map((contact) => (
                <li key={contact.id}>{contact.phone}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Problem2;
