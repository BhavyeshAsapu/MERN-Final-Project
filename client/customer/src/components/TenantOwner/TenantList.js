// TenantList.js
import React from "react";
import { useNavigate } from "react-router-dom";

const TenantList = ({ properties }) => {
    const navigate = useNavigate();

    const handleBuyClick = (propertyId) => {
        navigate(`/buy/${propertyId}`); // Redirect to the Buy page with the property ID
    };

    return (
        <div>
            <h2>Tenant Property Listings</h2>
            <div style={styles.propertyContainer}>
                {properties.map((property) => (
                    <div key={property.id} style={styles.propertyCard}>
                        <img
                            src={`http://localhost:5000${property.imageUrl}`}
                            alt={property.title}
                            style={{
                                width: "100%",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "5px",
                            }}
                        />
                        <h3>{property.title}</h3>
                        <p>{property.description}</p>
                        <p>Price: ₹{property.price.toLocaleString()}</p>
                        <p>Location: {property.location}</p>
                        <div style={styles.buttonContainer}>
                            <button style={styles.buyButton} onClick={() => handleBuyClick(property.id)}>
                                Buy
                            </button>
                            <button style={styles.rentButton}>Book for Rent</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    propertyContainer: {
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
    },
    propertyCard: {
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "20px",
        margin: "10px",
        width: "30%",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
    },
    buyButton: {
        backgroundColor: "#28a745",
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
    },
    rentButton: {
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default TenantList;
