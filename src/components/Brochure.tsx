import { formatPrice } from '@/lib/utils';
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register a modern, open-source font. This adds a lot to the professional feel.
// Using Lato from a public CDN.
Font.register({
  family: 'Lato',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wWw.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwiPHA.ttf', fontWeight: 700 },
  ]
});

const styles = StyleSheet.create({
  // General Page & Font Styles
  page: {
    fontFamily: 'Lato',
    fontSize: 10,
    padding: 40,
    lineHeight: 1.4,
    backgroundColor: '#FFFFFF',
    color: '#333333'
  },
  h1: { fontSize: 24, fontWeight: 700, color: '#1a202c', marginBottom: 5 },
  h2: { fontSize: 16, fontWeight: 700, color: '#7f23cf', marginBottom: 12 },
  text: { fontSize: 10, color: '#555555' },
  textMuted: { fontSize: 9, color: '#777777' },

  // Cover Page Styles
  coverPage: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  coverOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.4,
  },
  coverContent: {
    position: 'relative',
    zIndex: 1,
    padding: 40,
    color: 'white',
  },
  coverTitle: { fontFamily: 'Lato', fontSize: 32, fontWeight: 700, color: 'white', marginBottom: 8 },
  coverSubtitle: { fontFamily: 'Lato', fontSize: 16, color: 'white', opacity: 0.9, marginBottom: 20 },
  coverPrice: { fontFamily: 'Lato', fontSize: 24, fontWeight: 700, color: 'white', backgroundColor: '#7f23cf', padding: '8px 12px', borderRadius: 4 },

  // Detail Page Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#7f23cf',
    paddingBottom: 8,
    marginBottom: 20,
  },
  headerLogo: { width: 40, height: 40, backgroundColor: '#7f23cf', borderRadius: 4 },
  headerTitle: { fontSize: 14, fontWeight: 700, color: '#7f23cf' },

  twoColumnLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  mainColumn: { width: '65%' },
  sideColumn: { width: '30%' },

  section: { marginBottom: 20 },
  
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 10,
    gap: 8,
  },
  detailIcon: { width: 24, height: 24, backgroundColor: '#f0e6ff', padding: 5, borderRadius: 4 }, // Placeholder for icon
  detailTextContainer: { flexDirection: 'column' },
  detailLabel: { fontSize: 9, color: '#718096', textTransform: 'uppercase' },
  detailValue: { fontSize: 12, fontWeight: 700, color: '#2d3748' },

  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 5,
  },
  amenity: {
    backgroundColor: '#f0e6ff',
    color: '#7f23cf',
    padding: '4px 8px',
    borderRadius: 4,
    fontSize: 9,
  },

  agentSection: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  agentImage: { width: 50, height: 50, borderRadius: 25, objectFit: 'cover' },
  agentName: { fontSize: 12, fontWeight: 700 },

  qrSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  qrCode: { width: 80, height: 80 },

  footer: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#a0aec0',
  },
});

const Brochure = ({ property }) => {
  const propertyUrl = `https://yourwebsite.com/property/${property.slug}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${propertyUrl}`;

  return (
    <Document title={`${property.title} Brochure`} author="REMS">
      {/* --- COVER PAGE --- */}
      <Page size="A4" style={styles.coverPage}>
        <Image 
          style={styles.backgroundImage} 
          src={property.images && property.images.length > 0 ? property.images[0].image : 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800'} 
        />
        <View style={styles.coverOverlay} />
        <View style={styles.coverContent}>
          <Text style={styles.coverSubtitle}>Exclusive Property Offering</Text>
          <Text style={styles.coverTitle}>{property.title || 'N/A'}</Text>
          <Text style={styles.coverPrice}>{formatPrice(parseFloat(property.price), "₹")}</Text>
        </View>
      </Page>

      {/* --- DETAILS PAGE --- */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>REMS - Real Estate</Text>
          <View style={styles.headerLogo} />
        </View>

        <View style={styles.twoColumnLayout}>
          {/* Main Column */}
          <View style={styles.mainColumn}>
            <View style={styles.section}>
              <Text style={styles.h1}>{property.title || 'N/A'}</Text>
              <Text style={styles.textMuted}>{property.location || 'N/A'}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.h2}>Property Overview</Text>
              <Text style={styles.text}>{property.description || 'No description available.'}</Text>
            </View>

            {property.amenities && property.amenities.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.h2}>Amenities</Text>
                <View style={styles.amenitiesContainer}>
                  {property.amenities.slice(0, 8).map((amenity, index) => (
                    <Text key={index} style={styles.amenity}>{amenity.amenity || amenity}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>

          {/* Side Column */}
          <View style={styles.sideColumn}>
            <View style={[styles.section, { backgroundColor: '#f9f9f9', padding: 15, borderRadius: 5 }]}>
              <Text style={styles.h2}>Key Details</Text>
              <View style={styles.detailItem}>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Price</Text>
                  <Text style={styles.detailValue}>{formatPrice(parseFloat(property.price), "₹")}</Text>
                </View>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Area</Text>
                  <Text style={styles.detailValue}>{property.area || property.area_sqft || 'N/A'} sqft</Text>
                </View>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Bedrooms</Text>
                  <Text style={styles.detailValue}>{property.bedrooms || 'N/A'}</Text>
                </View>
              </View>
              <View style={styles.detailItem}>
                <View style={styles.detailTextContainer}>
                  <Text style={styles.detailLabel}>Bathrooms</Text>
                  <Text style={styles.detailValue}>{property.bathrooms || 'N/A'}</Text>
                </View>
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.h2}>Contact Agent</Text>
              <View style={styles.agentSection}>
                <Image style={styles.agentImage} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" />
                <View>
                  <Text style={styles.agentName}>Rajesh Kumar</Text>
                  <Text style={styles.textMuted}>+91 98765 43210</Text>
                </View>
              </View>
            </View>

            <View style={styles.qrSection}>
               <Text style={styles.textMuted}>Scan for online details</Text>
               <Image style={styles.qrCode} src={qrCodeUrl} />
            </View>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer} fixed>
          This brochure was generated by REMS for the property: {property.title}. All information is deemed reliable but not guaranteed. 
        </Text>
      </Page>
    </Document>
  );
};

export default Brochure;
