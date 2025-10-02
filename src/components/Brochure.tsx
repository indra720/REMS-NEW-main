import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});

const Brochure = ({ property }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{property.title}</Text>
        <Text style={styles.text}>{property.location}</Text>
      </View>
      <View style={styles.section}>
        <Image style={styles.image} src={property.images && property.images.length > 0 ? property.images[0].image : 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500'} />
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Price</Text>
        <Text style={styles.text}>{property.price}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Description</Text>
        <Text style={styles.text}>{property.description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Details</Text>
        <Text style={styles.text}>Bedrooms: {property.bedrooms}</Text>
        <Text style={styles.text}>Bathrooms: {property.bathrooms}</Text>
        <Text style={styles.text}>Area: {property.area} sqft</Text>
      </View>
    </Page>
  </Document>
);

export default Brochure;
