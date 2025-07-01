
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

    ["out_led_out_1", ["out_led_in_1_1","out_led_in_1_2"]],
    ["out_led_out_2", ["out_led_in_2_1","out_led_in_2_2"]],
    ["out_led_out_3", ["out_led_in_3_1","out_led_in_3_2"]],
    ["out_led_out_4", ["out_led_in_4_1","out_led_in_4_2"]],
    ["out_led_out_5", ["out_led_in_5_1","out_led_in_5_2"]],
    ["out_led_out_6", ["out_led_in_6_1","out_led_in_6_2"]],
    ["out_led_out_7", ["out_led_in_7_1","out_led_in_7_2"]],
    ["out_led_out_8", ["out_led_in_8_1","out_led_in_8_2"]],
    ["out_led_out_9", ["out_led_in_9_1","out_led_in_9_2"]],
    ["out_led_out_10", ["out_led_in_10_1","out_led_in_10_2"]],
  ]);

export const initialForwardDependencies = new Map([
    // INPUT
    // A
    ["inputA", ["in_pos_a_top_1", "in_pos_a_top_2", "in_pos_a_top_3", "in_pos_a_top_4",
        "in_pos_a_mid_1", "in_pos_a_mid_2", "in_pos_a_mid_3", "in_pos_a_mid_4",
        "in_pos_a_bot_1", "in_pos_a_bot_2", "in_pos_a_bot_3", "in_pos_a_bot_4"]],
    // B
    ["inputB", ["in_pos_b_top_1", "in_pos_b_top_2", "in_pos_b_top_3", "in_pos_b_top_4",
        "in_pos_b_mid_1", "in_pos_b_mid_2", "in_pos_b_mid_3", "in_pos_b_mid_4",
        "in_pos_b_bot_1", "in_pos_b_bot_2", "in_pos_b_bot_3", "in_pos_b_bot_4"]],
    // C
    ["inputC", ["in_pos_c_top_1", "in_pos_c_top_2", "in_pos_c_top_3", "in_pos_c_top_4",
        "in_pos_c_mid_1", "in_pos_c_mid_2", "in_pos_c_mid_3", "in_pos_c_mid_4",
        "in_pos_c_bot_1", "in_pos_c_bot_2", "in_pos_c_bot_3", "in_pos_c_bot_4"]],
    // D
    ["inputD", ["in_pos_d_top_1", "in_pos_d_top_2", "in_pos_d_top_3", "in_pos_d_top_4",
        "in_pos_d_mid_1", "in_pos_d_mid_2", "in_pos_d_mid_3", "in_pos_d_mid_4",
        "in_pos_d_bot_1", "in_pos_d_bot_2", "in_pos_d_bot_3", "in_pos_d_bot_4"]],

    // GATES
    // AND
      
])



/* Old version 
// Nodes that are connected by design, like islands or same line on gate
export const nodeGroups = new Map([
    // INPUT 
    // A
    ["in_neg_A", ["in_neg_a_top_1", "in_neg_a_top_2", "in_neg_a_top_3", "in_neg_a_top_4",
        "in_neg_a_mid_1", "in_neg_a_mid_2", "in_neg_a_mid_3", "in_neg_a_mid_4",
        "in_neg_a_bot_1", "in_neg_a_bot_2", "in_neg_a_bot_3", "in_neg_a_bot_4"]],
    // B
    ["in_neg_b", ["in_neg_b_top_1", "in_neg_b_top_2", "in_neg_b_top_3", "in_neg_b_top_4",
        "in_neg_b_mid_1", "in_neg_b_mid_2", "in_neg_b_mid_3", "in_neg_b_mid_4",
        "in_neg_b_bot_1", "in_neg_b_bot_2", "in_neg_b_bot_3", "in_neg_b_bot_4"]],
    // C
    ["in_neg_c", ["in_neg_c_top_1", "in_neg_c_top_2", "in_neg_c_top_3", "in_neg_c_top_4",
        "in_neg_c_mid_1", "in_neg_c_mid_2", "in_neg_c_mid_3", "in_neg_c_mid_4",
        "in_neg_c_bot_1", "in_neg_c_bot_2", "in_neg_c_bot_3", "in_neg_c_bot_4"]],
    // D
    ["in_neg_d", ["in_neg_d_top_1", "in_neg_d_top_2", "in_neg_d_top_3", "in_neg_d_top_4",
        "in_neg_d_mid_1", "in_neg_d_mid_2", "in_neg_d_mid_3", "in_neg_d_mid_4",
        "in_neg_d_bot_1", "in_neg_d_bot_2", "in_neg_d_bot_3", "in_neg_d_bot_4"]],

    // GATES
    // AND
    ["and_1", ["g_and_in_1_1", "g_and_in_1_2"]],
    ["and_2", ["g_and_in_2_1", "g_and_in_2_2"]],
    ["and_3", ["g_and_out_3_1", "g_and_out_3_2"]],
    ["and_4", ["g_and_in_4_1", "g_and_in_4_2"]],
    ["and_5", ["g_and_in_5_1", "g_and_in_5_2"]],
    ["and_6", ["g_and_out_6_1", "g_and_out_6_2"]],
    ["and_7", ["g_and_gnd_7_1", "g_and_gnd_7_2"]],

    ["and_8", ["g_and_out_8_1", "g_and_out_8_2"]],
    ["and_9", ["g_and_in_9_1", "g_and_in_9_2"]],
    ["and_10", ["g_and_in_10_1", "g_and_in_10_2"]],
    ["and_11", ["g_and_out_11_1", "g_and_out_11_2"]],
    ["and_12", ["g_and_in_12_1", "g_and_in_12_2"]],
    ["and_13", ["g_and_in_13_1", "g_and_in_13_2"]],
    ["and_14", ["g_and_vcc_14_1", "g_and_vcc_14_2"]],

    // OR
    ["or_1", ["g_or_in_1_1", "g_or_in_1_2"]],
    ["or_2", ["g_or_in_2_1", "g_or_in_2_2"]],
    ["or_3", ["g_or_out_3_1", "g_or_out_3_2"]],
    ["or_4", ["g_or_in_4_1", "g_or_in_4_2"]],
    ["or_5", ["g_or_in_5_1", "g_or_in_5_2"]],
    ["or_6", ["g_or_out_6_1", "g_or_out_6_2"]],
    ["or_7", ["g_or_gnd_7_1", "g_or_gnd_7_2"]],

    ["or_8", ["g_or_out_8_1", "g_or_out_8_2"]],
    ["or_9", ["g_or_in_9_1", "g_or_in_9_2"]],
    ["or_10", ["g_or_in_10_1", "g_or_in_10_2"]],
    ["or_11", ["g_or_out_11_1", "g_or_out_11_2"]],
    ["or_12", ["g_or_in_12_1", "g_or_in_12_2"]],
    ["or_13", ["g_or_in_13_1", "g_or_in_13_2"]],
    ["or_14", ["g_or_vcc_14_1", "g_or_vcc_14_2"]],

    // NOT
    ["not_1", ["g_not_in_1_1", "g_not_in_1_2"]],
    ["not_2", ["g_not_out_2_1", "g_not_out_2_2"]],
    ["not_3", ["g_not_in_3_1", "g_not_in_3_2"]],
    ["not_4", ["g_not_out_4_1", "g_not_out_4_2"]],
    ["not_5", ["g_not_in_5_1", "g_not_in_5_2"]],
    ["not_6", ["g_not_out_6_1", "g_not_out_6_2"]],
    ["not_7", ["g_not_gnd_7_1", "g_not_gnd_7_2"]],
    ["not_8", ["g_not_out_8_1", "g_not_out_8_2"]],
    ["not_9", ["g_not_in_9_1", "g_not_in_9_2"]],
    ["not_10", ["g_not_out_10_1", "g_not_out_10_2"]],
    ["not_11", ["g_not_in_11_1", "g_not_in_11_2"]],
    ["not_12", ["g_not_out_12_1", "g_not_out_12_2"]],
    ["not_13", ["g_not_in_13_1", "g_not_in_13_2"]],
    ["not_14", ["g_not_vcc_14_1", "g_not_vcc_14_2"]],

    // NAND
    ["nand_1", ["g_nand_in_1_1", "g_nand_in_1_2"]],
    ["nand_2", ["g_nand_in_2_1", "g_nand_in_2_2"]],
    ["nand_3", ["g_nand_out_3_1", "g_nand_out_3_2"]],
    ["nand_4", ["g_nand_in_4_1", "g_nand_in_4_2"]],
    ["nand_5", ["g_nand_in_5_1", "g_nand_in_5_2"]],
    ["nand_6", ["g_nand_out_6_1", "g_nand_out_6_2"]],
    ["nand_7", ["g_nand_gnd_7_1", "g_nand_gnd_7_2"]],

    ["nand_8", ["g_nand_out_8_1", "g_nand_out_8_2"]],
    ["nand_9", ["g_nand_in_9_1", "g_nand_in_9_2"]],
    ["nand_10", ["g_nand_in_10_1", "g_nand_in_10_2"]],
    ["nand_11", ["g_nand_out_11_1", "g_nand_out_11_2"]],
    ["nand_12", ["g_nand_in_12_1", "g_nand_in_12_2"]],
    ["nand_13", ["g_nand_in_13_1", "g_nand_in_13_2"]],
    ["nand_14", ["g_nand_vcc_14_1", "g_nand_vcc_14_2"]],
])

// Fill with all the outs on init, add connections as we input lines
export const initialDependencies = new Map([
    ["g_and_out_3_1", [nodeGroups.get("and_1"), nodeGroups.get("and_2")]],
    ["g_and_out_3_2", [nodeGroups.get("and_1"), nodeGroups.get("and_2")]],
    ["g_and_out_6_1", [nodeGroups.get("and_4"), nodeGroups.get("and_5")]],
    ["g_and_out_6_2", [nodeGroups.get("and_4"), nodeGroups.get("and_5")]],
    ["g_and_out_8_1", [nodeGroups.get("and_10"), nodeGroups.get("and_9")]],
    ["g_and_out_8_2", [nodeGroups.get("and_10"), nodeGroups.get("and_9")]],
    ["g_and_out_11_1", [nodeGroups.get("and_13"), nodeGroups.get("and_12")]],
    ["g_and_out_11_2", [nodeGroups.get("and_13"), nodeGroups.get("and_12")]],

    ["g_or_out_3_1", [nodeGroups.get("or_1"), nodeGroups.get("or_2")]],
    ["g_or_out_3_2", [nodeGroups.get("or_1"), nodeGroups.get("or_2")]],
    ["g_or_out_6_1", [nodeGroups.get("or_4"), nodeGroups.get("or_5")]],
    ["g_or_out_6_2", [nodeGroups.get("or_4"), nodeGroups.get("or_5")]],
    ["g_or_out_8_1", [nodeGroups.get("or_10"), nodeGroups.get("or_9")]],
    ["g_or_out_8_2", [nodeGroups.get("or_10"), nodeGroups.get("or_9")]],
    ["g_or_out_11_1", [nodeGroups.get("or_13"), nodeGroups.get("or_12")]],
    ["g_or_out_11_2", [nodeGroups.get("or_13"), nodeGroups.get("or_12")]],

    ["g_not_out_2_1", nodeGroups.get("not_1")],
    ["g_not_out_2_2", nodeGroups.get("not_1")],
    ["g_not_out_4_1", nodeGroups.get("not_3")],
    ["g_not_out_4_2", nodeGroups.get("not_3")],
    ["g_not_out_6_1", nodeGroups.get("not_5")],
    ["g_not_out_6_2", nodeGroups.get("not_5")],
    ["g_not_out_8_1", nodeGroups.get("not_9")],
    ["g_not_out_8_2", nodeGroups.get("not_9")],
    ["g_not_out_10_1", nodeGroups.get("not_11")],
    ["g_not_out_10_2", nodeGroups.get("not_11")],
    ["g_not_out_12_1", nodeGroups.get("not_13")],
    ["g_not_out_12_2", nodeGroups.get("not_13")],

    ["g_nand_out_3_1", [nodeGroups.get("nand_1"), nodeGroups.get("nand_2")]],
    ["g_nand_out_3_2", [nodeGroups.get("nand_1"), nodeGroups.get("nand_2")]],
    ["g_nand_out_6_1", [nodeGroups.get("nand_4"), nodeGroups.get("nand_5")]],
    ["g_nand_out_6_2", [nodeGroups.get("nand_4"), nodeGroups.get("nand_5")]],
    ["g_nand_out_8_1", [nodeGroups.get("nand_10"), nodeGroups.get("nand_9")]],
    ["g_nand_out_8_2", [nodeGroups.get("nand_10"), nodeGroups.get("nand_9")]],
    ["g_nand_out_11_1", [nodeGroups.get("nand_13"), nodeGroups.get("nand_12")]],
    ["g_nand_out_11_2", [nodeGroups.get("nand_13"), nodeGroups.get("nand_12")]],
]) */