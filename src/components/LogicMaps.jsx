
// Maps for each output pin exactly those input pins that logically determine its value.
export const initialDependencies = new Map([
    ["g_and_out_3_1", [["g_and_in_1_1", "g_and_in_1_2"], ["g_and_in_2_1", "g_and_in_2_2"]]],
    ["g_and_out_3_2", [["g_and_in_1_1", "g_and_in_1_2"], ["g_and_in_2_1", "g_and_in_2_2"]]],
    ["g_and_out_6_1", [["g_and_in_4_1", "g_and_in_4_2"], ["g_and_in_5_1", "g_and_in_5_2"]]],
    ["g_and_out_6_2", [["g_and_in_4_1", "g_and_in_4_2"], ["g_and_in_5_1", "g_and_in_5_2"]]],
    ["g_and_out_8_1", [["g_and_in_10_1", "g_and_in_10_2"], ["g_and_in_9_1", "g_and_in_9_2"]]],
    ["g_and_out_8_2", [["g_and_in_10_1", "g_and_in_10_2"], ["g_and_in_9_1", "g_and_in_9_2"]]],
    ["g_and_out_11_1", [["g_and_in_13_1", "g_and_in_13_2"], ["g_and_in_12_1", "g_and_in_12_2"]]],
    ["g_and_out_11_2", [["g_and_in_13_1", "g_and_in_13_2"], ["g_and_in_12_1", "g_and_in_12_2"]]],

    ["g_or_out_3_1", [["g_or_in_1_1", "g_or_in_1_2"], ["g_or_in_2_1", "g_or_in_2_2"]]],
    ["g_or_out_3_2", [["g_or_in_1_1", "g_or_in_1_2"], ["g_or_in_2_1", "g_or_in_2_2"]]],
    ["g_or_out_6_1", [["g_or_in_4_1", "g_or_in_4_2"], ["g_or_in_5_1", "g_or_in_5_2"]]],
    ["g_or_out_6_2", [["g_or_in_4_1", "g_or_in_4_2"], ["g_or_in_5_1", "g_or_in_5_2"]]],
    ["g_or_out_8_1", [["g_or_in_10_1", "g_or_in_10_2"], ["g_or_in_9_1", "g_or_in_9_2"]]],
    ["g_or_out_8_2", [["g_or_in_10_1", "g_or_in_10_2"], ["g_or_in_9_1", "g_or_in_9_2"]]],
    ["g_or_out_11_1", [["g_or_in_13_1", "g_or_in_13_2"], ["g_or_in_12_1", "g_or_in_12_2"]]],
    ["g_or_out_11_2", [["g_or_in_13_1", "g_or_in_13_2"], ["g_or_in_12_1", "g_or_in_12_2"]]],

    ["g_not_out_2_1", ["g_not_in_1_1", "g_not_in_1_2"]],
    ["g_not_out_2_2", ["g_not_in_1_1", "g_not_in_1_2"]],
    ["g_not_out_4_1", ["g_not_in_3_1", "g_not_in_3_2"]],
    ["g_not_out_4_2", ["g_not_in_3_1", "g_not_in_3_2"]],
    ["g_not_out_6_1", ["g_not_in_5_1", "g_not_in_5_2"]],
    ["g_not_out_6_2", ["g_not_in_5_1", "g_not_in_5_2"]],
    ["g_not_out_8_1", ["g_not_in_9_1", "g_not_in_9_2"]],
    ["g_not_out_8_2", ["g_not_in_9_1", "g_not_in_9_2"]],
    ["g_not_out_10_1", ["g_not_in_11_1", "g_not_in_11_2"]],
    ["g_not_out_10_2", ["g_not_in_11_1", "g_not_in_11_2"]],
    ["g_not_out_12_1", ["g_not_in_13_1", "g_not_in_13_2"]],
    ["g_not_out_12_2", ["g_not_in_13_1", "g_not_in_13_2"]],

    ["g_nand_out_3_1", [["g_nand_in_1_1", "g_nand_in_1_2"], ["g_nand_in_2_1", "g_nand_in_2_2"]]],
    ["g_nand_out_3_2", [["g_nand_in_1_1", "g_nand_in_1_2"], ["g_nand_in_2_1", "g_nand_in_2_2"]]],
    ["g_nand_out_6_1", [["g_nand_in_4_1", "g_nand_in_4_2"], ["g_nand_in_5_1", "g_nand_in_5_2"]]],
    ["g_nand_out_6_2", [["g_nand_in_4_1", "g_nand_in_4_2"], ["g_nand_in_5_1", "g_nand_in_5_2"]]],
    ["g_nand_out_8_1", [["g_nand_in_10_1", "g_nand_in_10_2"], ["g_nand_in_9_1", "g_nand_in_9_2"]]],
    ["g_nand_out_8_2", [["g_nand_in_10_1", "g_nand_in_10_2"], ["g_nand_in_9_1", "g_nand_in_9_2"]]],
    ["g_nand_out_11_1", [["g_nand_in_13_1", "g_nand_in_13_2"], ["g_nand_in_12_1", "g_nand_in_12_2"]]],
    ["g_nand_out_11_2", [["g_nand_in_13_1", "g_nand_in_13_2"], ["g_nand_in_12_1", "g_nand_in_12_2"]]],

    ["g_xor_out_3_1", [["g_xor_in_1_1", "g_xor_in_1_2"], ["g_xor_in_2_1", "g_xor_in_2_2"]]],
    ["g_xor_out_3_2", [["g_xor_in_1_1", "g_xor_in_1_2"], ["g_xor_in_2_1", "g_xor_in_2_2"]]],
    ["g_xor_out_6_1", [["g_xor_in_4_1", "g_xor_in_4_2"], ["g_xor_in_5_1", "g_xor_in_5_2"]]],
    ["g_xor_out_6_2", [["g_xor_in_4_1", "g_xor_in_4_2"], ["g_xor_in_5_1", "g_xor_in_5_2"]]],
    ["g_xor_out_8_1", [["g_xor_in_10_1", "g_xor_in_10_2"], ["g_xor_in_9_1", "g_xor_in_9_2"]]],
    ["g_xor_out_8_2", [["g_xor_in_10_1", "g_xor_in_10_2"], ["g_xor_in_9_1", "g_xor_in_9_2"]]],
    ["g_xor_out_11_1", [["g_xor_in_13_1", "g_xor_in_13_2"], ["g_xor_in_12_1", "g_xor_in_12_2"]]],
    ["g_xor_out_11_2", [["g_xor_in_13_1", "g_xor_in_13_2"], ["g_xor_in_12_1", "g_xor_in_12_2"]]],

    ["out_led_out_1", ["out_led_in_1_1", "out_led_in_1_2"]],
    ["out_led_out_2", ["out_led_in_2_1", "out_led_in_2_2"]],
    ["out_led_out_3", ["out_led_in_3_1", "out_led_in_3_2"]],
    ["out_led_out_4", ["out_led_in_4_1", "out_led_in_4_2"]],
    ["out_led_out_5", ["out_led_in_5_1", "out_led_in_5_2"]],
    ["out_led_out_6", ["out_led_in_6_1", "out_led_in_6_2"]],
    ["out_led_out_7", ["out_led_in_7_1", "out_led_in_7_2"]],
    ["out_led_out_8", ["out_led_in_8_1", "out_led_in_8_2"]],
    ["out_led_out_9", ["out_led_in_9_1", "out_led_in_9_2"]],
    ["out_led_out_10", ["out_led_in_10_1", "out_led_in_10_2"]],

    // D-Flip-Flop
    ["g_dff_out_1_1", [["g_dff_in_1_1", "g_dff_in_1_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_1_2", [["g_dff_in_1_1", "g_dff_in_1_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_2_1", [["g_dff_in_2_1", "g_dff_in_2_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_2_2", [["g_dff_in_2_1", "g_dff_in_2_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_3_1", [["g_dff_in_3_1", "g_dff_in_3_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_3_2", [["g_dff_in_3_1", "g_dff_in_3_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_4_1", [["g_dff_in_4_1", "g_dff_in_4_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_4_2", [["g_dff_in_4_1", "g_dff_in_4_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_5_1", [["g_dff_in_5_1", "g_dff_in_5_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_5_2", [["g_dff_in_5_1", "g_dff_in_5_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_6_1", [["g_dff_in_6_1", "g_dff_in_6_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_6_2", [["g_dff_in_6_1", "g_dff_in_6_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_7_1", [["g_dff_in_7_1", "g_dff_in_7_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_7_2", [["g_dff_in_7_1", "g_dff_in_7_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_8_1", [["g_dff_in_8_1", "g_dff_in_8_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],
    ["g_dff_out_8_2", [["g_dff_in_8_1", "g_dff_in_8_2"], ["g_dff_oe_1", "g_dff_oe_2"]]],



    // BLANK ARRAYS FOR CONNECTED NODES
    // NEGATIVE INPUT
    ["a", []],
    ["b", []],
    ["c", []],
    ["d", []],

    // ISLANDS
    ["1", []],
    ["2", []],
    ["3", []],
    ["4", []],
    ["5", []],
    ["6", []],
    ["7", []],
    ["8", []],
    ["9", []],
    ["10", []],
    ["11", []],
    ["12", []]
]);

export const initialForwardDependencies = new Map([
    // INPUT
    // A
    ["inputA", ["in_a_top_1", "in_a_top_2", "in_a_top_3", "in_a_top_4",
        "in_a_mid_1", "in_a_mid_2", "in_a_mid_3", "in_a_mid_4",
        "in_a_bot_1", "in_a_bot_2", "in_a_bot_3", "in_a_bot_4"]],
    // B
    ["inputB", ["in_b_top_1", "in_b_top_2", "in_b_top_3", "in_b_top_4",
        "in_b_mid_1", "in_b_mid_2", "in_b_mid_3", "in_b_mid_4",
        "in_b_bot_1", "in_b_bot_2", "in_b_bot_3", "in_b_bot_4"]],
    // C
    ["inputC", ["in_c_top_1", "in_c_top_2", "in_c_top_3", "in_c_top_4",
        "in_c_mid_1", "in_c_mid_2", "in_c_mid_3", "in_c_mid_4",
        "in_c_bot_1", "in_c_bot_2", "in_c_bot_3", "in_c_bot_4"]],
    // D
    ["inputD", ["in_d_top_1", "in_d_top_2", "in_d_top_3", "in_d_top_4",
        "in_d_mid_1", "in_d_mid_2", "in_d_mid_3", "in_d_mid_4",
        "in_d_bot_1", "in_d_bot_2", "in_d_bot_3", "in_d_bot_4"]],

    // INPUT-BUTTON
    ["inputButton", ["in_but_1", "in_but_2", "in_but_3", "in_but_4"]],

    ["g_dff_cp_1", ["g_dff_out_1_1", "g_dff_out_1_2",
        "g_dff_out_2_1", "g_dff_out_2_2",
        "g_dff_out_3_1", "g_dff_out_3_2",
        "g_dff_out_4_1", "g_dff_out_4_2",
        "g_dff_out_5_1", "g_dff_out_5_2",
        "g_dff_out_6_1", "g_dff_out_6_2",
        "g_dff_out_7_1", "g_dff_out_7_2",
        "g_dff_out_8_1", "g_dff_out_8_2"]],

    ["g_dff_cp_2", ["g_dff_out_1_1", "g_dff_out_1_2",
        "g_dff_out_2_1", "g_dff_out_2_2",
        "g_dff_out_3_1", "g_dff_out_3_2",
        "g_dff_out_4_1", "g_dff_out_4_2",
        "g_dff_out_5_1", "g_dff_out_5_2",
        "g_dff_out_6_1", "g_dff_out_6_2",
        "g_dff_out_7_1", "g_dff_out_7_2",
        "g_dff_out_8_1", "g_dff_out_8_2"]],

    // GATES
    // AND

])


// Nodes that are connected by design, islands or negative inputs
export const nodeGroups = new Map([

    // INPUT 
    // A
    ["a", ["io_a_top_1", "io_a_top_2", "io_a_top_3", "io_a_top_4",
        "io_a_mid_1", "io_a_mid_2", "io_a_mid_3", "io_a_mid_4",
        "io_a_bot_1", "io_a_bot_2", "io_a_bot_3", "io_a_bot_4"]],
    // B
    ["b", ["io_b_top_1", "io_b_top_2", "io_b_top_3", "io_b_top_4",
        "io_b_mid_1", "io_b_mid_2", "io_b_mid_3", "io_b_mid_4",
        "io_b_bot_1", "io_b_bot_2", "io_b_bot_3", "io_b_bot_4"]],
    // C
    ["c", ["io_c_top_1", "io_c_top_2", "io_c_top_3", "io_c_top_4",
        "io_c_mid_1", "io_c_mid_2", "io_c_mid_3", "io_c_mid_4",
        "io_c_bot_1", "io_c_bot_2", "io_c_bot_3", "io_c_bot_4"]],
    // D
    ["d", ["io_d_top_1", "io_d_top_2", "io_d_top_3", "io_d_top_4",
        "io_d_mid_1", "io_d_mid_2", "io_d_mid_3", "io_d_mid_4",
        "io_d_bot_1", "io_d_bot_2", "io_d_bot_3", "io_d_bot_4"]],



    ["1", ["io_1_1", "io_1_2", "io_1_3", "io_1_4"]],
    ["2", ["io_2_1", "io_2_2", "io_2_3", "io_2_4"]],
    ["3", ["io_3_1", "io_3_2", "io_3_3", "io_3_4"]],
    ["4", ["io_4_1", "io_4_2", "io_4_3", "io_4_4"]],
    ["5", ["io_5_1", "io_5_2", "io_5_3", "io_5_4"]],
    ["6", ["io_6_1", "io_6_2", "io_6_3", "io_6_4"]],
    ["7", ["io_7_1", "io_7_2", "io_7_3", "io_7_4"]],
    ["8", ["io_8_1", "io_8_2", "io_8_3", "io_8_4"]],
    ["9", ["io_9_1", "io_9_2", "io_9_3", "io_9_4"]],
    ["10", ["io_10_1", "io_10_2", "io_10_3", "io_10_4"]],
    ["11", ["io_11_1", "io_11_2", "io_11_3", "io_11_4"]],
    ["12", ["io_12_1", "io_12_2", "io_12_3", "io_12_4"]],


    ["dff_out", [
        "g_dff_out_1_1", "g_dff_out_1_2",
        "g_dff_out_2_1", "g_dff_out_2_2",
        "g_dff_out_3_1", "g_dff_out_3_2",
        "g_dff_out_4_1", "g_dff_out_4_2",
        "g_dff_out_5_1", "g_dff_out_5_2",
        "g_dff_out_6_1", "g_dff_out_6_2",
        "g_dff_out_7_1", "g_dff_out_7_2",
        "g_dff_out_8_1", "g_dff_out_8_2"
    ]],

])