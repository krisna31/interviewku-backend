package com.capstone.interviewku.ui.fragments.registerdetail

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.core.view.isVisible
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.capstone.interviewku.R
import com.capstone.interviewku.databinding.FragmentRegisterDetailBinding
import com.capstone.interviewku.ui.activities.main.MainActivity
import com.capstone.interviewku.ui.fragments.datepicker.DatePickerFragment
import com.capstone.interviewku.ui.fragments.datepicker.DatePickerListener
import com.capstone.interviewku.util.Extensions.handleHttpException
import com.capstone.interviewku.util.Helpers
import com.capstone.interviewku.util.Result
import com.capstone.interviewku.util.SpinnerModel
import dagger.hilt.android.AndroidEntryPoint
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

@AndroidEntryPoint
class RegisterDetailFragment : Fragment() {
    private var _binding: FragmentRegisterDetailBinding? = null
    private val binding
        get() = _binding!!

    private val viewModel by viewModels<RegisterDetailViewModel>()

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentRegisterDetailBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.spinnerGender.adapter = ArrayAdapter(
            requireContext(),
            R.layout.spinner_item,
            Helpers.getGenders(requireContext())
        )

        binding.btnRegisterScreen.apply {
            isEnabled = false
            setOnClickListener {
                val gender = (binding.spinnerGender.selectedItem as SpinnerModel?)?.value
                val birthdate = viewModel.birthDate
                val currentCity = binding.editTextDomisili.text.toString()
                val jobPositionId =
                    (binding.spinnerJobPosition.selectedItem as SpinnerModel?)?.value?.toIntOrNull()

                Log.d("test", "onViewCreated: $gender $birthdate $currentCity $jobPositionId")
                if (gender == null || birthdate == null || currentCity.isEmpty() || jobPositionId == null || jobPositionId == -1) {
                    return@setOnClickListener
                } else {
                    viewModel.addUserIdentity(jobPositionId, gender, birthdate, currentCity)
                }
            }
        }

        binding.ivBirthdate.setOnClickListener {
            DatePickerFragment(
                object : DatePickerListener {
                    override fun onDateSet(year: Int, month: Int, dayOfMonth: Int) {
                        viewModel.birthDate = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
                            .format(Calendar.getInstance().run {
                                set(year, month, dayOfMonth)
                                time
                            })
                        binding.tvBirthdate.text = viewModel.birthDate
                    }
                }
            ).show(parentFragmentManager, "")
        }

        viewModel.jobPositionState.observe(viewLifecycleOwner) {
            when (it) {
                is Result.Success -> {
                    binding.progressBar.isVisible = false
                    it.data.data?.let { jobPositionsResponseData ->
                        val spinnerData = mutableListOf<SpinnerModel>()
                        spinnerData.add(SpinnerModel("-1", "Silahkan Pilih"))
                        spinnerData.addAll(
                            jobPositionsResponseData.jobPositions.map { jobPosition ->
                                SpinnerModel(jobPosition.id.toString(), jobPosition.name)
                            }
                        )

                        binding.btnRegisterScreen.isEnabled = true
                        binding.spinnerJobPosition.adapter = ArrayAdapter(
                            requireContext(),
                            R.layout.spinner_item,
                            spinnerData
                        )
                    }
                }

                is Result.Loading -> {
                    binding.progressBar.isVisible = true
                }

                is Result.Error -> {
                    binding.progressBar.isVisible = false
                    it.exception.getData()?.handleHttpException(requireContext())
                }
            }
        }

        viewModel.addUserIdentityState.observe(viewLifecycleOwner) {
            when (it) {
                is Result.Success -> {
                    binding.progressBar.isVisible = false
                    Toast.makeText(requireContext(), it.data.message, Toast.LENGTH_SHORT).show()

                    startActivity(Intent(requireContext(), MainActivity::class.java))
                    requireActivity().finish()
                }

                is Result.Loading -> {
                    binding.progressBar.isVisible = true
                }

                is Result.Error -> {
                    binding.progressBar.isVisible = false
                    it.exception.getData()?.handleHttpException(requireContext())
                }
            }
        }

        viewModel.getJobPositions()
    }

    override fun onDestroy() {
        _binding = null
        super.onDestroy()
    }
}