import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#e21b1b',
  border: '#ccc',
  placeholder: '#ccc',
  optionBg: '#f0f0f0',
  white: '#fff',
  error: 'red',
  trackOff: '#e0e0e0',
  trackOn: '#ff4d4d',
  thumbOff: '#f4f3f4',
  thumbOn: '#e21b1b',
  // Botões de navegação
  next: '#007aff',
  back: '#eef0f3',
  backText: '#1f2933',
  disabledBg: '#dfe3e8',
  disabledText: '#9aa5b1',
};

export const commonStyles = StyleSheet.create({
  scrollContainer: { flexGrow: 1 },
  container: { flex: 1, padding: 20, backgroundColor: colors.white },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 5,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    backgroundColor: colors.optionBg,
  },
  selectedOptionContainer: { backgroundColor: colors.primary },
  optionText: { fontSize: 16 },
  selectedOptionText: { color: colors.white, fontWeight: 'bold' },
  errorText: { color: colors.error, fontSize: 12, marginTop: -5, marginBottom: 10 },
});
