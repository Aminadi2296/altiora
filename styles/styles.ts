import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 40,
  },
  topRow: {
    alignItems: 'center',
  },
  avatar: {
    width: 180,
    height: 220,
    borderRadius: 40,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
},
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
},
  editIcon: {
    fontSize: 18,
    padding: 4,
},
  areasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    alignSelf: 'stretch',     // 💥 Ensures it uses full width of parent
    minWidth: '100%', 
  },
  addAreaWrapper: {
    marginTop: 16,
  },
  areaItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 12,
  paddingHorizontal: 16,
  backgroundColor: '#f9f9f9',
  borderRadius: 8,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#eee',
},
areaName: {
  fontSize: 16,
  fontWeight: '500',
},
areaBarWrapper: {
  width: '48%',
  marginBottom: 1,
},


  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
  },
  formRow: {
    flexDirection: 'row',
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  goalsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  goalsSection: {
    marginTop: 24,
  },
  goalsList: {
    gap: 10,
  },
  noGoalsText: {
  fontSize: 16,
  color: '#666',
  marginTop: 8,
},

  goalsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  addGoalButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addGoalButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  goalItem: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f4f4f4',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  goalText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  goalXP: {
    fontSize: 14,
    color: '#666',
  }
});

export default styles;
