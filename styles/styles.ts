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
  areasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  addAreaWrapper: {
    marginTop: 16,
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
  goalsSection: {
    marginTop: 32,
  },
  goalsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  addGoalButton: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    alignItems: 'center',
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
