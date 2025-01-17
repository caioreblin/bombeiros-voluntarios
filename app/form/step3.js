import React, { useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
} from "react-native";
import { FormContext } from "../../context/FormContext";
import { useRouter } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";

export default function Step3() {
    const { formData, setFormData } = useContext(FormContext);
    const router = useRouter();

    const vtrOptions = [
        { label: "UCIR-0331", value: "UCIR-0331" },
        { label: "UCI-0330", value: "UCI-0330" },
        { label: "UCIR-0350", value: "UCIR-0350" },
        { label: "UTB-0351", value: "UTB-0351" },
        { label: "UTB-0305", value: "UTB-0305" },
    ];

    const unidadeOptions = [
        { label: "Centro", value: "Centro" },
        { label: "Barra", value: "Barra" },
        { label: "Nereu", value: "Nereu" },
        { label: "João Pessoa", value: "João Pessoa" },
    ];

    const handleInputChange = (table, index, field, value) => {
        const updatedTable = [...formData[table]];
        updatedTable[index][field] = value;

        // Atualiza o total de litros consumidos considerando ambas as tabelas
        const totalLitros = [
            ...formData.tabelaVTRs,
            ...formData.tabelaServicosApoio,
        ].reduce((sum, row) => sum + (parseFloat(row.litros) || 0), 0);

        setFormData({
            ...formData,
            [table]: updatedTable,
            totalLitrosConsumidos: totalLitros,
        });
    };

    const addRow = (table) => {
        if (formData[table].length < 10) {
            const newRow =
                table === "tabelaVTRs"
                    ? {
                          vtr: "",
                          unidade: "",
                          litros: "",
                          kmFinal: "",
                          motorista: "",
                      }
                    : { vtr: "", cidade: "", litros: "" };

            setFormData({
                ...formData,
                [table]: [...formData[table], newRow],
            });
        }
    };

    const removeRow = (table) => {
        const updatedTable = [...formData[table]];
        updatedTable.pop();

        const totalLitros = [
            ...formData.tabelaVTRs,
            ...formData.tabelaServicosApoio,
        ].reduce((sum, row) => sum + (parseFloat(row.litros) || 0), 0);

        setFormData({
            ...formData,
            [table]: updatedTable,
            totalLitrosConsumidos: totalLitros,
        });
    };

    const handleNext = () => {
        console.log("Dados do formulário no Passo 3:", formData);
        router.push("/form/step4");
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tabela de Viaturas</Text>
            <FlatList
                data={formData.tabelaVTRs}
                keyExtractor={(item, index) => `vtr-${index}`}
                renderItem={({ item, index }) => (
                    <View style={styles.row}>
                        <Dropdown
                            style={[styles.input, { height: 50 }]}
                            containerStyle={{
                                width: 200,
                            }}
                            selectedTextStyle={{ fontSize: 14 }}
                            itemTextStyle={{ fontSize: 14 }}
                            data={[
                                { label: "Selecione...", value: "" },
                                ...(vtrOptions?.map((val) => ({
                                    label: val.label,
                                    value: val.value,
                                })) || []),
                            ]}
                            labelField="label"
                            valueField="value"
                            value={item.vtr}
                            onChange={(selected) =>
                                handleInputChange(
                                    "tabelaVTRs",
                                    index,
                                    "vtr",
                                    selected.value
                                )
                            }
                            maxHeight={290}
                        />
                        <Dropdown
                            style={[styles.input, { height: 50 }]}
                            containerStyle={{
                                width: 200,
                            }}
                            selectedTextStyle={{ fontSize: 14 }}
                            itemTextStyle={{ fontSize: 14 }}
                            data={[
                                { label: "Selecione...", value: "" },
                                ...(unidadeOptions?.map((val) => ({
                                    label: val.label,
                                    value: val.value,
                                })) || []),
                            ]}
                            labelField="label"
                            valueField="value"
                            value={item.unidade}
                            onChange={(selected) =>
                                handleInputChange(
                                    "tabelaVTRs",
                                    index,
                                    "unidade",
                                    selected.value
                                )
                            }
                            maxHeight={290}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Litros"
                            placeholderTextColor="#ccc"
                            value={item.litros}
                            onChangeText={(value) =>
                                handleInputChange(
                                    "tabelaVTRs",
                                    index,
                                    "litros",
                                    value
                                )
                            }
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Km Final"
                            placeholderTextColor="#ccc"
                            value={item.kmFinal}
                            onChangeText={(value) =>
                                handleInputChange(
                                    "tabelaVTRs",
                                    index,
                                    "kmFinal",
                                    value
                                )
                            }
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Motorista"
                            placeholderTextColor="#ccc"
                            value={item.motorista}
                            onChangeText={(value) =>
                                handleInputChange(
                                    "tabelaVTRs",
                                    index,
                                    "motorista",
                                    value
                                )
                            }
                        />
                    </View>
                )}
                ListFooterComponent={
                    <>
                        <Button
                            title="Adicionar Linha"
                            onPress={() => addRow("tabelaVTRs")}
                        />
                        {formData.tabelaVTRs.length > 1 && (
                            <View style={{ marginTop: 5 }}>
                                <Button
                                    title="Remover linha"
                                    style={styles.removeButton}
                                    onPress={() => removeRow("tabelaVTRs")}
                                    color="red"
                                />
                            </View>
                        )}
                    </>
                }
            />

            <Text style={[styles.title, { marginTop: 20 }]}>
                Serviços de Apoio
            </Text>
            <FlatList
                data={formData.tabelaServicosApoio}
                keyExtractor={(item, index) => `apoio-${index}`}
                renderItem={({ item, index }) => (
                    <View style={styles.row}>
                        <TextInput
                            style={styles.input}
                            placeholder="VTR"
                            placeholderTextColor="#ccc"
                            value={item.vtr}
                            onChangeText={(value) =>
                                handleInputChange(
                                    "tabelaServicosApoio",
                                    index,
                                    "vtr",
                                    value
                                )
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Cidade"
                            placeholderTextColor="#ccc"
                            value={item.cidade}
                            onChangeText={(value) =>
                                handleInputChange(
                                    "tabelaServicosApoio",
                                    index,
                                    "cidade",
                                    value
                                )
                            }
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Litros"
                            placeholderTextColor="#ccc"
                            value={item.litros}
                            onChangeText={(value) =>
                                handleInputChange(
                                    "tabelaServicosApoio",
                                    index,
                                    "litros",
                                    value
                                )
                            }
                            keyboardType="numeric"
                        />
                    </View>
                )}
                ListFooterComponent={
                    <>
                        <Button
                            title="Adicionar Linha"
                            onPress={() => addRow("tabelaServicosApoio")}
                        />
                        {formData.tabelaServicosApoio.length > 1 && (
                            <View style={{ marginTop: 5 }}>
                                <Button
                                    title="Remover linha"
                                    onPress={() =>
                                        removeRow("tabelaServicosApoio")
                                    }
                                    color="red"
                                />
                            </View>
                        )}
                    </>
                }
            />

            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>
                    Total de Litros Consumidos:{" "}
                    {formData.totalLitrosConsumidos.toFixed(2)}
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Voltar" onPress={handleBack} />
                <Button title="Próximo" onPress={handleNext} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        marginHorizontal: 5,
    },
    totalContainer: { marginTop: 20 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    totalText: { fontSize: 16, fontWeight: "bold", marginBottom: 20 },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
